### 从零到自动化部署：我的问题与解决方案总结

在实现自动化部署的过程中，我遇到了许多问题，并通过不断调试和优化逐步解决了它们。以下是我遇到的问题以及对应的解决方案总结，希望能为其他开发者提供参考。

---

#### **问题 1：如何在 `package.json` 中增加一个命令，运行 `deploy_script.bash` 文件？**

**问题描述**：
我希望在 `package.json` 中增加一个命令，当运行 `npm run deploy` 时，能够执行一个名为 `deploy_script.bash` 的脚本文件。

**解决方案**：
在 `package.json` 的 `scripts` 部分添加 `deploy` 命令，指向 `deploy_script.bash` 文件：
```json
{
  "scripts": {
    "deploy": "./deploy_script.bash"
  }
}
```
同时，确保 `deploy_script.bash` 文件具有可执行权限：
```bash
chmod +x deploy_script.bash
```

---

#### **问题 2：如何在 `deploy_script.bash` 中实现打包并将 `dist` 目录推送到远程分支？**

**问题描述**：
我希望在 `deploy_script.bash` 中实现以下功能：
1. 运行 `npm run build` 打包项目，生成 `dist` 目录。
2. 将 `dist` 目录中的内容推送到远程分支（如 `main` 或 `dev`）。

**解决方案**：
通过 Git 命令创建一个临时分支，将 `dist` 目录中的内容复制到该分支，并强制推送到远程分支。以下是关键步骤：
1. 创建临时分支：
   ```bash
   git checkout --orphan temp-deploy
   git reset --hard
   ```
2. 复制 `dist` 目录内容：
   ```bash
   cp -r dist/* .
   ```
3. 提交更改并强制推送：
   ```bash
   git add .
   git commit -m "Deploy: Update main branch with latest build"
   git push origin temp-deploy:main --force
   ```

---

#### **问题 3：如何避免在清空目录时误删 `dist` 目录？**

**问题描述**：
在清空当前目录时，误删了 `dist` 目录，导致后续步骤无法复制 `dist` 内容。

**解决方案**：
使用 `find` 命令清空目录时，排除 `.git` 和 `dist` 目录：
```bash
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name 'dist' -exec rm -rf {} +
```

---

#### **问题 4：如何确保 `node_modules` 目录不会被上传？**

**问题描述**：
`node_modules` 目录不应该被推送到远程分支，但脚本中没有处理这个问题。

**解决方案**：
在临时分支中创建 `.gitignore` 文件，忽略 `node_modules` 和 `dist` 目录：
```bash
cat <<EOL > .gitignore
node_modules/
dist/
*.log
*.tmp
.DS_Store
EOL
```

---

#### **问题 5：如何解决删除 `temp-deploy` 分支时的错误？**

**问题描述**：
在删除 `temp-deploy` 分支时，遇到了 `error: cannot delete branch 'temp-deploy' used by worktree` 错误。

**解决方案**：
在删除 `temp-deploy` 分支之前，先切换到其他分支（如 `dev`）：
```bash
git checkout dev || git checkout -b dev
git branch -D temp-deploy
```

---

#### **问题 6：如何在 GitHub Actions 中运行 `deploy_script.bash` 脚本？**

**问题描述**：
在 GitHub Actions 中运行脚本时，遇到了 `Permission denied` 错误。

**解决方案**：
在 GitHub Actions 工作流中，显式地为脚本赋予执行权限：
```yaml
- name: Make deploy_script.bash executable
  run: chmod +x ./deploy_script.bash
```

---

#### **问题 7：如何解决 GitHub Actions 中的 `Author identity unknown` 错误？**

**问题描述**：
在 GitHub Actions 中提交更改时，遇到了 `Author identity unknown` 错误。

**解决方案**：
在脚本中配置 Git 用户信息：
```bash
git config --global user.name "GitHub Actions"
git config --global user.email "actions@github.com"
```

---

#### **问题 8：如何实现当 `dev` 分支有新提交时自动运行部署脚本？**

**问题描述**：
我希望在 `dev` 分支有新提交时，自动运行部署脚本。

**解决方案**：
使用 GitHub Actions 实现自动化部署。以下是关键配置：
1. 创建 GitHub Actions 工作流文件（如 `.github/workflows/deploy-on-dev-push.yml`）。
2. 配置触发条件为 `dev` 分支的 `push` 事件：
   ```yaml
   on:
     push:
       branches:
         - dev
   ```
3. 在工作流中运行部署脚本：
   ```yaml
   - name: Run deploy script
     run: npm run deploy
   ```

---

### 总结

通过以上步骤，我成功实现了从本地开发到自动化部署的完整流程。以下是关键点：
1. **本地脚本**：通过 `deploy_script.bash` 实现打包和推送。
2. **GitHub Actions**：通过 CI/CD 工具实现自动化触发。
3. **问题解决**：通过逐步调试，解决了权限、分支冲突、Git 用户信息等问题。

希望这篇文章能为其他开发者提供帮助！如果你有更多问题，欢迎随时交流！
