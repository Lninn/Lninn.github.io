#!/bin/bash

# 1. 安装项目依赖
echo "Running npm install..."
npm install

# 检查 npm install 是否成功
if [ $? -ne 0 ]; then
  echo "Error: npm install failed."
  exit 1
fi

# 2. 打包项目
echo "Running npm run build..."
npm run build

# 检查是否成功生成 dist 目录
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found. Build failed."
  exit 1
fi

# 3. 检查 temp-deploy 分支是否存在，如果存在则删除
if git show-ref --quiet refs/heads/temp-deploy; then
  echo "Deleting existing temp-deploy branch..."
  # 切换到 dev 分支以释放对 temp-deploy 的占用
  git checkout dev || git checkout -b dev
  git branch -D temp-deploy
fi

# 4. 创建一个临时分支用于部署
echo "Creating temporary branch for deployment..."
git checkout --orphan temp-deploy
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

# 8. 提交更改
echo "Committing changes to temporary branch..."
git add .
git commit -m "Deploy: Update main branch with latest build"

# 9. 强制推送到远程 main 分支
echo "Force pushing changes to origin/main..."
git push origin temp-deploy:main --force

# 10. 切换回 dev 分支
echo "Switching back to dev branch..."
git checkout dev

# 11. 删除临时分支
echo "Deleting temporary branch..."
git branch -D temp-deploy

echo "Deployment to origin/main completed successfully!"
