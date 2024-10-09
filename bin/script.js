import { promisify } from "util";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import copydir from 'copy-dir';
import ora from "ora"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 创建模板项目
 * @param {string} projectName
 * @param {string} projectDesc 
 */
export async function createProject(projectName, projectDesc) {
  const copyLoad = ora().start("创建模板项目");
  projectName = projectName || 'ts-template';
  const projectDir = path.join(process.cwd(), `./${projectName}`);

  // 创建文件夹
  try {
    fs.mkdirSync(projectDir);
  } catch (e) {
    return copyLoad.fail(e.message);
  }

  // 拷贝模板
  await promisify(copydir)(path.resolve(__dirname, `./template/`), projectDir);

  // 更新package.json的名称与描述
  const pkgPath = path.join(projectDir, 'package.json');
  const pkgConfig = readJSON(pkgPath);
  pkgConfig.name = projectName;
  pkgConfig.description = projectDesc;
  writeJSON(pkgPath, pkgConfig);

  copyLoad.succeed()
}

/**
 * 读json文件
 * @param {string} filePath 文件路径
 * @return {Object} json 文件内容
 */
function readJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

/**
 * 写json文件
 * @param {string} filePath 文件路径
 * @param {Object} json 文件内容
 */
function writeJSON(filePath, json) {
  const str = JSON.stringify(json, null, 2);
  fs.writeFileSync(filePath, str, 'utf8');
}