add_task(async function() {
  const dbg = await initDebugger("doc-react.html", "App.js");

  await selectSource(dbg, "App.js");
  await addBreakpoint(dbg, "App.js", 11);

  info('Test previewing an immutable Map inside of a react component')
  invokeInTab("clickButton");
  await waitForPaused(dbg);
  await waitForState(
    dbg,
    state => dbg.selectors.getSelectedScopeMappings(state)
  );

  await assertPreviewTextValue(dbg, 10, 22, {
    text: "size: 1",
    expression: "_this.fields;"
  });
});
