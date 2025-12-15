# Website


## Application
Ung
npm install --save docusaurus


npm install --save-dev nodemon || sửa code tự động cập nhật code mới khi đang chạy

## Installation
 - npm run clear


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

``` npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/types@latest   ````

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
Nếu bạn đang sử dụng các trang GitHub để lưu trữ, lệnh này là một cách thuận tiện để xây dựng trang web và đẩy lên nhánh `gh-pages`.

Dùng Capacitor hoặc Cordova
Hai công cụ này giúp bạn biến web app (như Docusaurus) thành mobile app.


## hướng dẫn hùng .md & .mdx
 - Markdown hiểu xuống dòng khi có 2 dấu cách ở cuối dòng hoặc <br />
 - ![Docusaurus v3.9](/img/png/blog/docusaurus-v3_9.png) thêm hình ảnh
 - <img src="/img/png/blog/docusaurus-v3_9.png" alt="Docusaurus v3.9" width="600" /> thêm hình ảnh
 - ___ dùng *** và --- để gạch ngang
 - <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' controls /> video
 - <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Demo Docusaurus" frameborder="0" allowfullscreen><iframe> video
 - " 
<div
  style={{
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
  }}
>
  <iframe
    src="https://www.youtube.com/embed/Yhyx7otSksg?si=hazjK5VV5spV3JnY"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }}
  />
</div>
"
 - <span style="background-color: red">Foo</span>