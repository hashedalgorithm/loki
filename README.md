# Loki 🧩

Loki is a lightweight React component designed to simplify the creation of inline text links with custom styles. It eliminates the need for manually nesting multiple `<span>` and `<a>` tags, making it easier to create styled inline links in React and Next.js applications.

## Features

- **📚 Simplified Inline Links**: Easily create inline links from formatted strings without manually nesting tags.
- **🎨 Customizable Styles**: Apply custom styles to links using the `linkClassName` prop.
- **🔗 Flexible Link Targeting**: Configure the `target` attribute for links (e.g., `_blank`, `_self`).
- **⚡ Lightweight and Fast**: Built with performance in mind, leveraging React's `useMemo` for efficient rendering.

## Installation

Install Loki using npm or yarn:

```bash
npm install loki
```

```bash
yarn add loki
```

## Usage

The `TextInlineLink` component accepts a string as its `children` prop. The string should follow this format:

```
I agree to [Terms & Conditions](https://www.sample.com/terms)
```

This will render the text `I agree to Terms & Conditions`, where `Terms & Conditions` is a hyperlink pointing to `https://www.sample.com/terms`.

### Example

```tsx
import { TextInlineLink } from 'loki';

const App = () => {
  return (
    <TextInlineLink linkClassName="text-blue-500 underline">
      I agree to [Terms & Conditions](https://www.sample.com/terms)
    </TextInlineLink>
  );
};

export default App;
```

### Props

| Prop            | Type     | Description                                                                 |
| --------------- | -------- | --------------------------------------------------------------------------- |
| `children`      | `string` | The input string containing text and links in the specified format.         |
| `linkClassName` | `string` | Optional. Custom class name to style the link text.                         |
| `target`        | `string` | Optional. Specifies the target attribute for the links (default: `_blank`). |

## How It Works

The component parses the input string using a regular expression to identify patterns like `[label](link)`. It then replaces these patterns with the appropriate HTML structure, including `<span>` and `<a>` tags, while applying the provided styles and attributes.

### Input Example

```text
I agree to [Terms & Conditions](https://www.sample.com/terms)
```

### Output HTML

```html
<p>
  I agree to
  <span class="mx-1">
    <a href="https://www.sample.com/terms" target="_blank">
      <span class="underline text-blue-500">Terms & Conditions</span>
    </a>
  </span>
</p>
```

## Customization

You can customize the appearance of the links by passing a `linkClassName` prop. For example:

```tsx
<TextInlineLink linkClassName="text-red-500 underline">
  Click [here](https://www.example.com) for more details.
</TextInlineLink>
```

This will render the link with a red underline.

## Limitations

- The input string must follow the `[label](link)` format for links to be parsed correctly.
- The component uses `dangerouslySetInnerHTML` to render the parsed HTML, so ensure the input string is sanitized if it comes from an untrusted source.

## Issues

If you encounter any bugs or have suggestions for improvements, please [open an issue](https://github.com/hashedalgorithm/loki/issues).

## Contributing

Contributions are welcome! Please refer to the [contribution guidelines](https://github.com/hashedalgorithm/loki/contributing) before getting started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
