#!/bin/bash

# 设置 Git 用户信息
GIT_USER_NAME=${GIT_USER_NAME:-"GitHub Actions"}
GIT_USER_EMAIL=${GIT_USER_EMAIL:-"actions@github.com"}

# 生成唯一的临时分支名称
TEMP_BRANCH="temp-deploy-$(date +%s)"  # 使用时间戳作为唯一标识符

# 1. 安装项目依赖
echo "Running npm install..."
if ! npm install; then
  echo "Error: npm install failed."
  exit 1
fi

# 2. 打包项目
echo "Running npm run build..."
if ! npm run build; then
  echo "Error: npm run build failed."
  exit 1
fi

# 检查是否成功生成 dist 目录
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found. Build failed."
  exit 1
fi

# 3. 检查临时分支是否存在，如果存在则删除
if git show-ref --quiet refs/heads/"$TEMP_BRANCH"; then
  echo "Deleting existing temporary branch..."
  git branch -D "$TEMP_BRANCH"
fi

# 4. 创建一个临时分支用于部署
echo "Creating temporary branch for deployment..."
git checkout --orphan "$TEMP_BRANCH"
git reset --hard

# 5. 清空当前目录（除了 .git、dist 和 node_modules 目录）
echo "Cleaning current directory (except .git, dist, and node_modules)..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name 'dist' ! -name 'node_modules' -exec rm -rf {} +

# 6. 创建 .gitignore 文件，屏蔽 node_modules 和 dist 等目录
echo "Creating .gitignore file..."
cat <<EOL > .gitignore
# Ignore node_modules and dist directories
node_modules/
dist/

# Ignore other build artifacts
*.log
*.tmp
.DS_Store
EOL

# 7. 将 dist 目录中的内容复制到当前目录
echo "Copying dist contents to temporary branch..."
cp -r dist/* .

# 8. 配置 Git 用户信息
echo "Configuring Git user information..."
git config --global user.name "$GIT_USER_NAME"
git config --global user.email "$GIT_USER_EMAIL"

# 9. 提交更改
echo "Committing changes to temporary branch..."
git add .
if ! git commit -m "Deploy: Update main branch with latest build"; then
  echo "Error: Failed to commit changes."
  exit 1
fi

# 10. 推送临时分支并创建 Pull Request
echo "Pushing temporary branch and creating Pull Request..."
if ! git push origin "$TEMP_BRANCH"; then
  echo "Error: Failed to push temporary branch."
  exit 1
fi

# 使用 GitHub CLI 创建 Pull Request
if ! gh pr create --base main --head "$TEMP_BRANCH" --title "Deploy: Update main branch with latest build" --body "Automated deployment of the latest build."; then
  echo "Error: Failed to create Pull Request."
  exit 1
fi

# 11. 切换回 dev 分支
echo "Switching back to dev branch..."
git checkout dev

# 12. 删除临时分支
echo "Deleting temporary branch..."
git branch -D "$TEMP_BRANCH"

echo "Deployment to origin/main completed successfully!"
