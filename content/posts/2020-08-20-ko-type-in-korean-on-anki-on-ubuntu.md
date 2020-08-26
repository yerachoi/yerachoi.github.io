# Ubuntu 20.04에 UIM 통해 한글 입력 설정 후 Anki에서 한글 입력이 되지 않는 현상 해결법

---

title: "Ubuntu 20.04에 UIM 통해 한글 입력 설정 후 Anki에서 한글 입력이 되지 않는 현상 해결법"
date: "2020-08-20T10:00:00.000Z"
template: "post"
language: "ko"
draft: false
slug: "/posts/type-in-korean-on-anki-on-ubuntu/ko"
link: "/posts/type-in-korean-on-anki-on-ubuntu"
category: "설정"
tags:

  - "우분투 20.04"
  - "한글"
  - "UIM"
  - "Anki"
  - "안키"
  - "앙키"

---

## 문제

우분투 20.04에 UIM 벼루를 사용해 한글 입력기 설정을 하니 대부분의 프로그램들에서는 한글 입력이 문제 없이 잘 되었습니다. 하지만 Anki에서 한글을 입력하려고 하니 한영 전환이 되지 않고 영어만 입력되는 현상이 발생했습니다. 

## 해결

아래 ```ln -s``` 명령어로 Anki에서도 ```libuimplatforminputcontextplugin.so ``` Qt 플러그인을 사용할 수 있도록 심볼릭 링크를 생성하면 됩니다.

```shell
​```
sudo ln -s /usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/libuimplatforminputcontextplugin.so /usr/local/share/anki/bin/PyQt5/Qt/plugins/platforminputcontexts/libuimplatforminputcontextplugin.so
​```
```

``````fcitx```, ```ibus``` 등 다른 입력기를 사용하는 경우 ```/usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/``` 내에서 해당하는 Qt 플러그인에 대한 심볼릭 링크를 생성하여 같은 방법으로 해결할 수 있을 것으로 생각합니다.