# OpenAI Chatbox

An Open-source Chatbox Widget For Website with ChatGPT integration

Demo: https://openaivn.github.io/oav-chatbox/

# For Development

Start project for develoment

> npm start

Build the project

> npm run build

# API Elements

- oav-info
- oav-chat-widget
- oav-chat-button

# How to use?

Copy the following code, embed into your website

### Example 1:

Auto inject, just paste code with attribute: `data-botscript="autoInject"`

```html
<!-- head: just only insert lib -->
<script type="text/javascript" data-botscript="autoInject" data-name="cooing-aquamarine-dormouse" src="https://openaivn.github.io/oav-chatbox/js/oav-chatbox-latest.js" async></script>
```

### Example 2:

Using custom elements: `oav-chat-widget`

```html
<!-- head: insert lib -->
<script type="text/javascript" src="https://openaivn.github.io/oav-chatbox/js/oav-chatbox-latest.js" async></script>

<!-- body: embed -->
<oav-chat-widget name="demo" active="true"></oav-chat-widget>
```

### Example 3:

Using custom elements: `oav-chat-button`

```html
<!-- head: insert lib -->
<script type="text/javascript" src="https://openaivn.github.io/oav-chatbox/js/oav-chatbox-latest.js" async></script>

<!-- body: embed -->
<oav-chat-button name="demo" active="true">TURN ON</oav-chat-button>
```

# OAV Community

Join us on social networks!

[<img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white">](https://facebook.com/groups/openaivnofficial)
[<img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white">](https://t.me/OpenAI_VN)
[<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">](https://discord.gg/2NMK8hhDxx)

# License

MIT License

Copyright (c) 2023 OpenAI Vietnam
