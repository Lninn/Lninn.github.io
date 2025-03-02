#!/bin/bash

# 1. 打包项目
echo "Running npm run build..."
npm run build

# 检查是否成功生成 dist 目录
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found. Build failed."
  exit 1
fi

# 2. 检查 temp-deploy 分支是否存在，如果存在则删除
if git show-ref --quiet refs/heads/temp-deploy; then
  echo "Deleting existing temp-deploy branch..."
  # 切换到 dev 分支以释放对 temp-deploy 的占用
  git checkout dev || git checkout -b dev
  git branch -D temp-deploy
fi

# 3. 创建一个临时分支用于部署
echo "Creating temporary branch for deployment..."
git checkout --orphan temp-deploy
git reset --hard

# 4. 清空当前目录（除了 .git 目录）
echo "Cleaning current directory..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# 5. 创建 .gitignore 文件，屏蔽 node_modules 和 dist 等目录
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

# 6. 将 dist 目录中的内容复制到当前目录
echo "Copying dist contents to temporary branch..."
cp -r dist/* .

# 7. 提交更改
echo "Committing changes to temporary branch..."
git add .
git commit -m "Deploy: Update main branch with latest build"

# 8. 强制推送到远程 main 分支
echo "Force pushing changes to origin/main..."
git push origin temp-deploy:main --force

# 9. 切换回 dev 分支
echo "Switching back to dev branch..."
git checkout dev

# 10. 删除临时分支
echo "Deleting temporary branch..."
git branch -D temp-deploy

echo "Deployment to origin/main completed successfully!"
