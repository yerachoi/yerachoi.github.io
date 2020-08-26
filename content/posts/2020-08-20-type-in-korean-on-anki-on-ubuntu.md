# How to type in Korean on Anki after setting up the UIM Korean input on Ubuntu 20.04

---

title: "How to type in Korean on Anki after setting up the UIM Korean input on Ubuntu 20.04"
date: "2020-08-20T10:00:00.000Z"
template: "post"
language: "ko"
draft: false
slug: "/posts/type-in-korean-on-anki-on-ubuntu"
link: "/posts/type-in-korean-on-anki-on-ubuntu/ko"
category: "set up"
tags:

  - "Ubuntu 20.04"
  - "Korean"
  - "UIM"
  - "Anki"

---

## Issue

After setting up a Korean input system via UIM Byeoru on Ubuntu 20.04, I have been typing in Korean without any problems on most of the programs. Unfortunately, when I tried to type in Korean on Anki, the Korean-English toggle key did not work, and I could type only in English.

## Resolution

I have solved this issue by using the ```ln -s``` command below, which creates a symbolic link to the ```libuimplatforminputcontextplugin.so ```  Qt plug-in that Anki can use.

```shell
​```
sudo ln -s /usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/libuimplatforminputcontextplugin.so /usr/local/share/anki/bin/PyQt5/Qt/plugins/platforminputcontexts/libuimplatforminputcontextplugin.so
​```
```

I believe that the gist of this solution may also apply to other input sources such as ``````fcitx``` and ```ibus```, by creating a symbolic link to the Qt plug-in corresponding to the input source of interest located in ```/usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/```.