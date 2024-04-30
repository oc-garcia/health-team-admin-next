import { render } from "@testing-library/react";
import StaffViewer from "@/components/StaffViewer";
import { ActionBarProvider } from "@/context/actionBarContext";

describe("StaffViewer", () => {
  test("renders StaffViewer component", () => {
    render(
      <ActionBarProvider>
        <StaffViewer />
      </ActionBarProvider>
    );
  });
});