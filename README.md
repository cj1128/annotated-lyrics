# 注音歌词

获取日语或者粤语的注音歌词，并生成 PDF 用于打印。日语利用软件自动给汉字注音，粤语使用[粤拼歌词网](http://jyut6.com)获得注音好的歌词文件。

## 日语歌词生成

输入歌词 txt 文件以及输出路径即可，歌词文件格式见下文。

e.g. `node main.js jp -f lyrics/ルー ジュ.txt`

```
node main.js jp --help

Generate Japanese lyric pdf

Options:
  -h, --help     Show help                                             [boolean]
  --file, -f                                                          [required]
  --output, -o   output path, default to pdfs/[input-name].pdf
  --style, -s    css style file                              [default: "jp.css"]
  -v, --version  Show version number                                   [boolean]
```

### 日语歌词格式

- 第一行为歌名
- 第二行为歌手名
- 空行
- 之后每一行为日语歌词
- 歌词之间用空行分隔
- 如果歌词有中文翻译的话，跟在日语歌词下一行，不用换行

e.g.

```
ルージュ
中島みゆき

口をきくのがうまくなりました
我现在已经很会搭讪了

どんな酔いしれた人にでも
即使面对一个烂醉如泥的人也一样
```

### 已生成歌词

- [ルー ジュ.pdf]
