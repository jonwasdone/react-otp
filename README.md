[![Static Badge](https://img.shields.io/badge/coverage-100-green)](https://github.com/jonwasdone/react-otp)
[![Static Badge](https://img.shields.io/badge/license-MIT-brightgreen)](https://github.com/jonwasdone/react-otp/blob/main/LICENSE)

# React OTP Input

A simple fully customizable OTP input component for React that focuses on versatility and robustness.

![see here](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGpjYmNjZjljY2l0MzJpNjA2aGl3c2ZnemtoMnE0bG8ycTRtaWp3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sZral6dSk6HCWuesnY/giphy.gif)

## Install

```
$ npm install --save @jonwasdone/react-otp
```

### Usage

```jsx
function App() {
  const [otp, setOtp] = useState("");

  return (
    <OTPInputGroup length={6} onChange={(otp) => setOtp(otp)} value={otp} />
  );
}

export default App;
```

### API

| Prop                 | Type                               | Default | Description                                                                                                                                              |
| -------------------- | ---------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus            | boolean                            | true    | Whether the input should be focused on mount.                                                                                                            |
| length               | number                             | 4       | The length of the OTP input.                                                                                                                             |
| onChange             | (otp: string) => void              | -       | The callback function that is called when the OTP input changes.                                                                                         |
| onSubmit             | (otp: string) => void              | -       | The callback function that is called when the OTP input is completed. Once the last value of the input is entered, the onSubmit callback gets triggered. |
| onPaste              | (otp: string) => void              | -       | The callback function that is called when the OTP input is pasted.                                                                                       |
| defaultValue         | string                             | ""      | The default value of the OTP input.                                                                                                                      |
| value                | string                             | -       | The value of the OTP input.                                                                                                                              |
| style                | React.CSSProperties                | {}      | The style of the input.                                                                                                                                  |
| inputClassName       | string                             | -       | The class name of the input.                                                                                                                             |
| inputGroupClassName  | string                             | -       | The style of the input container.                                                                                                                        |
| inputSeparatorRender | (index: number) => React.ReactNode | -       | The function that returns the separator between the inputs. The separator can be conditionally rendered in relation to the id of the input before.       |

### Styling

The component is fully customizable. You can style the input and the input container by passing the `style`, `inputClassName`, and `inputGroupClassName` props.

```jsx
<OTPInputGroup
  length={6}
  onChange={(otp) => setOtp(otp)}
  value={otp}
  style={{ color: "red" }}
  inputClassName="input"
  inputGroupClassName="input-group"
/>
```

To include the default styles, you can import the `import "@jonwasdone/react-otp/dist/index.css";` file from the package.
If you are using [Tailwind CSS](https://tailwindcss.com/), you don't need to include the styles as the component is built with Tailwind.

### License

[![Static Badge](https://img.shields.io/badge/license-MIT-brightgreen)](https://github.com/jonwasdone/react-otp/blob/main/LICENSE)

### Contributing

[![Static Badge](https://img.shields.io/badge/Contributions-welcome-green?logo=github)](https://github.com/jonwasdone/react-otp/pulls)

Feel free to contribute to the project by opening an issue or a pull request. 🥑

### Author

Vasjon Done - [GitHub](https://github.com/jonwasdone)
