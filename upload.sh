#!/bin/bash
echo "Rodando o build do sistema"
npm run build

echo "Removendo arquivos antigos do servidor..."
ssh root@145.223.29.87 "rm -rf /var/www/rm_web/*
cd /var/www/rm_sislog/
git pull"

echo "Subindo novo build..."
scp -r ./build/* root@145.223.29.87:/var/www/rm_web/

echo "Deploy concluído!"
