// 创建 packages 文件
/* eslint-disable @typescript-eslint/no-require-imports */

const inquirer = require('inquirer');
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const { Minimatch } = require('minimatch');

const npmUser = execSync('npm whoami --registry=https://registry.npmjs.org/').toString('utf8').trim();
const user = execSync('git config user.name').toString('utf8').trim();
const email = execSync('git config user.email').toString('utf8').trim();

function log(fn) {
  return (msg) => {
    console.log(fn(msg));
  };
}

const successLog = log(chalk.green);
const errorLog = log(chalk.red);
const warningLog = log(chalk.yellow);
const infoLog = log(chalk.cyan);

const REG_LIBRARY = /^[a-z]+(\-[a-z]+)*$/;

const TEMPLATES_SETTINGS = {
  'js-library': {
    msg: '请输入 New Package 名称（小写字母、中划线连接）：',
    regular: REG_LIBRARY,
    targetDir: path.resolve(__dirname, '../packages'),
    tplDir: path.resolve(__dirname, '../templates/js-library-tpl'),
  },
  'ts-library': {
    msg: '请输入 New Package 名称（小写字母、中划线连接）：',
    regular: REG_LIBRARY,
    targetDir: path.resolve(__dirname, '../packages'),
    tplDir: path.resolve(__dirname, '../templates/ts-library-tpl'),
  },
  'lit-element-library': {
    msg: '请输入 New Package 名称（小写字母、中划线连接）：',
    regular: REG_LIBRARY,
    targetDir: path.resolve(__dirname, '../packages'),
    tplDir: path.resolve(__dirname, '../templates/lit-element-library-tpl'),
  },
};

// 入口文件
async function init() {
  const resp = await askQuestion();
  const { template, desc, author, name } = resp;
  const setting = TEMPLATES_SETTINGS[template];

  const dir = `${setting.targetDir}/${name}`;

  await generate({
    src: setting.tplDir,
    dest: dir,
    metadata: { projectName: name, projectDescription: desc, author, email: email, npmUser },
  });
  successLog(`👏 🎉 👏 🎉 👏 🎉，已成功新建 ${name} 项目`);
  successLog(`\n如何打开本地当前 ${name} 项目文档服务:\n`);
  successLog(`  - 运行命令:        npm run docs:start`);
  successLog(`  - 当前项目的文档:  http://localhost:3000/components/basic/${name}`);
}

init();

async function askQuestion() {
  return inquirer.prompt([
    {
      type: 'list',
      message: '请选择packages模板',
      name: 'template',
      choices: [
        { name: '基础 JS 模板', value: 'js-library' },
        { name: '基础 TS 模板', value: 'ts-library' },
        { name: 'lit element 模板', value: 'lit-element-library' },
      ],
      default: 'ts-library',
    },
    {
      type: 'input',
      name: 'name',
      message: ({ template }) => TEMPLATES_SETTINGS[template].msg,
      validate: async (name, { template }) => {
        const setting = TEMPLATES_SETTINGS[template];
        // 判断输入规则
        if (!setting.regular.test(name)) {
          warningLog('\n项目名称格式出错，请重新输入');
          return false;
        }
        const dir = `${setting.targetDir}/${name}`;
        // 不存在自动新建，并返回路径
        const path = await fse.ensureDir(dir);

        if (!path) {
          warningLog('\n已存在同名目录，请检查后重新输入');
          return false;
        }

        return true;
      },
    },
    {
      type: 'input',
      name: 'desc',
      message: '请输入项目描述',
    },
    {
      type: 'input',
      name: 'author',
      message: '请输入 Author（中英文皆可，用于自动添加 Author 标签）：',
      default: user,
    },
  ]);
}
// 生成模板
function generate(config) {
  infoLog(`模板配置数据：${JSON.stringify(config, null, '\t')}`);
  return new Promise((resolve, reject) => {
    const { src, metadata, dest } = config;
    Metalsmith(__dirname)
      .metadata(metadata) // metadata 为用户输入的内容
      .clean(false) // 写入目标目录之前是否删除目标目录
      .frontmatter(false) // 是否解析 YAML frontmatter
      .source(src) // 模板文件 path
      .destination(dest) // 最终编译好的文件存放位置
      .use(
        // 转换名字
        metalsmithRename([
          {
            pattern: 'docs/*.md',
            rename: (name) => {
              const newName = name.replace('api', metadata.projectName);
              return newName;
            },
          },
        ])
      )
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach((fileName) => {
          const source = files[fileName].contents.toString();
          const template = Handlebars.compile(source);
          files[fileName].contents = Buffer.from(template(meta));
        });
        done();
      })
      .build((err) => {
        err ? reject(err) : resolve();
      });
  });
}

// const options = [
//   {
//     pattern: 'docs/**/*.md',
//     rename: function (name) {
//       return 'renamed' + name;
//     },
//   },// ====> docs/**/renamed+*.md
//   {
//     pattern: 'public/about.html',
//     rename: 'index.html',
//   }, // ====> public/index.html
// ];
/**
 * @desc 只转换目录下的文件名。
 * @param {array} options options,pattern: 使用 minimatch 去匹配filename
 * @return {(function(*=, *, *): void)|*}
 */
function metalsmithRename(options = []) {
  return (files, _, done) => {
    // 转换名字
    options.forEach((opt) => {
      const { pattern, rename } = opt;
      const matcher = Minimatch(pattern);

      Object.keys(files).forEach((filename) => {
        if (!matcher.match(filename)) {
          return;
        }

        // 返回目录名
        let newFilename = path.dirname(filename);

        // 防止是根目录
        if (newFilename === '.') {
          newFilename = '';
        }

        if (typeof rename === 'function') {
          // 先返回目录最后一部分，在和新目录组合在一起
          newFilename = path.join(newFilename, rename(path.basename(filename)));
        } else {
          newFilename = path.join(newFilename, rename);
        }

        if (newFilename !== filename) {
          files[newFilename] = files[filename];
          delete files[filename];
        }
      });
    });

    done();
  };
}
