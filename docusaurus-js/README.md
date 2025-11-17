# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Application
Ung
npm install --save docusaurus


## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
Lệnh này tạo nội dung tĩnh vào thư mục `build` và có thể được cung cấp bằng bất kỳ dịch vụ lưu trữ nội dung tĩnh nào.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

```bash
npm run start
```

```npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/types@latest`   ````

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
Nếu bạn đang sử dụng các trang GitHub để lưu trữ, lệnh này là một cách thuận tiện để xây dựng trang web và đẩy lên nhánh `gh-pages`.

Dùng Capacitor hoặc Cordova
Hai công cụ này giúp bạn biến web app (như Docusaurus) thành mobile app.


## hướng dẫn hùng .md & .mdx
 - Markdown hiểu xuống dòng khi có 2 dấu cách ở cuối dòng hoặc <br />