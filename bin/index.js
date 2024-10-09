#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import { createProject } from "./script.js";
const program = new Command();

program
  .name("ts-tpl-cli")
  .command("create")
  .description("创建ts基础项目模板")
  .action(async () => {
    const { projectName, projectDesc } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称：",
      },
      {
        type: "input",
        name: "projectDesc",
        message: "请输入项目描述：",
      }
    ]);

    createProject(projectName, projectDesc);
  })

// 解析用户执行命令传入参数
program.parse(process.argv);