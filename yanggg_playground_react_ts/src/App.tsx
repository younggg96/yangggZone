import Button, {
  ButtonColor,
  ButtonSize,
  ButtonAppearance,
  ButtonVariant,
} from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <section>
        <h1>Button</h1>
        <h4>Variant</h4>
        <div className="buttons">
          <Button variant={ButtonVariant.Contained} color={ButtonColor.Info}>
            Contained Button
          </Button>
          <Button variant={ButtonVariant.Outlined} color={ButtonColor.Info}>
            Outlined Button
          </Button>
          <Button variant={ButtonVariant.Ghosted} color={ButtonColor.Info}>
            Ghosted Button
          </Button>
        </div>
        <h4>Colors</h4>
        <div className="buttons">
          <Button color={ButtonColor.Default}>Default Button</Button>
          <Button color={ButtonColor.Primary}>Primary Button</Button>
          <Button color={ButtonColor.Secondary}>Secondary Button</Button>
          <Button color={ButtonColor.Info}>Info Button</Button>
          <Button color={ButtonColor.Success}>Success Button</Button>
          <Button color={ButtonColor.Danger}>Danger Button</Button>
          <Button color={ButtonColor.Warning}>Warning Button</Button>
        </div>
        <h4>Sizes</h4>
        <div className="buttons">
          <Button size={ButtonSize.Small}>Small Button</Button>
          <Button>Default Button</Button>
          <Button size={ButtonSize.Large}>Large Button</Button>
        </div>
        <h4>Disabled</h4>
        <div className="buttons">
          <Button>Default Button</Button>
          <Button disabled>Default Button</Button>
        </div>
        <h4>Links</h4>
        <div className="buttons">
          <Button link href="#">
            Link
          </Button>
          <Button link href="#" disabled>
            Disabled Link
          </Button>
        </div>
        <h4>Appearance</h4>
        <div className="buttons">
          <span>Round:</span>
          <Button size={ButtonSize.Small} appearance={ButtonAppearance.Round}>
            Round Button
          </Button>
          <Button appearance={ButtonAppearance.Round}>Round Button</Button>
          <Button size={ButtonSize.Large} appearance={ButtonAppearance.Round}>
            Round Button
          </Button>
        </div>
        <div className="buttons">
          <span>Square:</span>
          <Button appearance={ButtonAppearance.Square}>Square Button</Button>
        </div>
        <h4>Ripple</h4>
        <div className="buttons">
          <span>Default Ripple:</span>
          <Button>No Ripple Button</Button>
          <span>Disabled Ripple:</span>
          <Button noRipple>No Ripple Button</Button>
        </div>
      </section>
      <section>
        <h1>Menu</h1>
        <h4>Menu</h4>
        <Menu
          defaultIndex={0}
          mode="vertical"
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>link 0 </MenuItem>
          <MenuItem>link 1 </MenuItem>
          <MenuItem disabled>link 1 </MenuItem>
        </Menu>
      </section>
    </div>
  );
}

export default App;
