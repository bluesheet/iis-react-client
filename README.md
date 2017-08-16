# react-iis-client
基于React制作的信息查询系统


## Installation

    yarn 或 npm i

## Usages

开发调试

    yarn dev:all 或 npm run dev

编译生产环境

1. 修改配置文件 `src/config/production.js`

```js
export default {
  domain     : 'http://192.168.1.214:7014',
  apiPath    : '/api/v1'
}
```

2. 运行编译

   yarn build:all 或 npm run build:all

3. 将生成的文件上传至服务器，生成的目录为 `dist`

4. 服务器 `nginx` 配置

```
server
{
	listen       80;

	server_name xxx.com;
	index index.html index.htm default.html default.htm;
	root  /path/to/iis-react-client;


	location / {
		try_files $uri  /index.html;
	}

	location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
	{
		expires      30d;
	}

	location ~ .*\.(js|css)?$
	{
		expires      12h;
	}

}
```