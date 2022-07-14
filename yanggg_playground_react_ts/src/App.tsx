import Button, {
  ButtonType,
  ButtonSize,
  ButtonAppearance,
} from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <h1>Button</h1>
      <h4>Button Types</h4>
      <div className="buttons">
        <Button btnType={ButtonType.Default}>Default Button</Button>
        <Button btnType={ButtonType.Primary}>Primary Button</Button>
        <Button btnType={ButtonType.Info} disabled>
          Info Button
        </Button>
        <Button btnType={ButtonType.Success}>Success Button</Button>
        <Button btnType={ButtonType.Danger}>Danger Button</Button>
        <Button btnType={ButtonType.Warning}>Warning Button</Button>
      </div>
      <h4>Button Sizes</h4>
      <div className="buttons">
        <Button>Default Button</Button>
        <Button size={ButtonSize.Small}>Small Button</Button>
        <Button size={ButtonSize.Large}>Large Button</Button>
      </div>
      <h4>Button Disabled</h4>
      <div className="buttons">
        <Button>Default Button</Button>
        <Button disabled>Default Button</Button>
      </div>
      <h4>Button Links</h4>
      <div className="buttons">
        <Button btnType={ButtonType.Link} href="#">
          Link
        </Button>
        <Button btnType={ButtonType.Link} href="#" disabled>
          Disabled Link
        </Button>
      </div>
      <h4>Button Appearance</h4>
      <div className="buttons">
        <Button
          btnType={ButtonType.Default}
          appearance={ButtonAppearance.Round}
        >
          Default Button
        </Button>
      </div>
    </div>
  );
}

export default App;
