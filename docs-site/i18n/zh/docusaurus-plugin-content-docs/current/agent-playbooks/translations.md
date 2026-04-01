# 翻译工作流程

此项目使用 `public/translations/{lang}/default.json` 中的 i18next 翻译文件。

## 规则

不要手动编辑每个语言文件。使用 `scripts/update-translations.js`。

## 添加或更新密钥

1. 创建一个临时字典文件，例如`translations-temp.json`:

```json
{
  "en": "English text",
  "es": "Spanish text",
  "fr": "French text",
  "de": "German text"
}
```

2. 应用翻译地图：

```bash
node scripts/update-translations.js --key my_new_key --map translations-temp.json --include-en --write
```

3. 删除临时字典文件。

## 其他有用命令

```bash
# Copy a key from English to all languages (dry run then write)
node scripts/update-translations.js --key some_key --from en --dry
node scripts/update-translations.js --key some_key --from en --write

# Delete a key from all languages
node scripts/update-translations.js --key obsolete_key --delete --write

# Audit for unused translation keys
node scripts/update-translations.js --audit --dry
node scripts/update-translations.js --audit --write
```
