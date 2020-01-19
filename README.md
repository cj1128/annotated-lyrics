# 注音歌词

获取日语或者粤语的注音歌词，并生成 PDF 用于打印。日语利用软件自动给汉字注音，粤语使用 [粤拼歌词网] 获得注音好的歌词文件，可以指定 CSS 文件来自定义样式。

![](http://ww1.sinaimg.cn/large/9b85365dly1fzml3nf5mij20mx0zfq7u)
![](http://ww1.sinaimg.cn/large/9b85365dly1fzml3nf0onj20mx0zfdlv)

## 已生成 PDF

- [ルージュ]: http://asset.cjting.cn/annotated-lyrics/ルージュ.pdf
- [爱与痛的边缘]: http://asset.cjting.cn/annotated-lyrics/爱与痛的边缘.pdf

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

## 粤语歌词生成

首先，去 [粤拼歌词网] 去搜索自己想要的歌词，点击结果进入歌词页面，查看地址栏的 `id` 参数，例如「爱与痛的边缘」的 id = 211，然后使用以下指令生成。

e.g. `node main.js can -i 211`

```bash
main.js can

Generate Cantonese lyric pdf

Options:
  -h, --help     Show help                                             [boolean]
  --id, -i                                                            [required]
  --output, -o   output path, default to pdfs/[input-name].pdf
  --style, -s    css style file                             [default: "can.css"]
  -v, --version  Show version number                                   [boolean]
```

[粤拼歌词网]: http://jyut6.com
