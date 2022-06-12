# cmr2-main-menu-icon-generation-preview

<small><em>eeeee, macarena</em></small>

This app serves as a little utility for me to preview Colin Mcrae Rally 2.0 style animated icons based on a source SVG file and other parameters such as text to display, font size, or animation's speed. It's powered by Vite, TypeScript and GSAP. I've decided to open source it, because it might come in handy for somebody else... not that I think it's likely, but you never know!

## Notes

- I've only tested this tool against a couple of free Font Awesome icons, so IT might not work properly for other icon sets... feel free to open a pull request with proper fixes, I'd appreciate it!
- Because this tool relies on GSAP for pretty much the entire animation, it's currently impossible to export the result to another SVG file. But once again, if you do find a way around this, implementing the solution is just a pull request away.

## Local development

```
> git clone https://github.com/maciejpedzich/cmr2-main-menu-icon-generation-preview
> cd cmr2-main-menu-icon-generation-preview
> npm install
```

### Running the dev server

```
npm run dev
```

### Building the website

```
npm run build
```

## LICENSE

MIT
