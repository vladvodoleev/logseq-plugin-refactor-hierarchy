import React, { useEffect } from "react";
import { useSetThemeColors } from "../hooks/use-set-theme-colors";
import { useAppVisible } from "../utils";
import Popup from "./Popup";
import RefactorForm from "./RefactorForm";

function App() {
  const visible = useAppVisible();
  const onClose = () => window.logseq.hideMainUI();
  const setThemeColors = useSetThemeColors();

  useEffect(() => {
    setThemeColors();
  }, [setThemeColors]);

  return (
    <Popup open={visible} onOpenChange={onClose} title="Enter match text">
      <RefactorForm />
    </Popup>
  );
}

export default App;
