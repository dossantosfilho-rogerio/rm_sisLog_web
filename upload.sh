#!/bin/bash

echo "Removendo arquivos antigos do servidor..."
ssh root@145.223.29.87 "rm -rf /var/www/rm_web/*"

echo "Subindo novo build..."
scp -r ./build/* root@145.223.29.87:/var/www/rm_web/

echo "Deploy concluído!"
