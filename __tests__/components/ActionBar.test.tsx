import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActionBarProvider } from "@/context/actionBarContext";
import ActionsBar from "@/components/ActionsBar";

test("renders ActionsBar and checks interaction", () => {
  render(
    <ActionBarProvider>
      <ActionsBar />
    </ActionBarProvider>
  );


  const addStaffButton = screen.getByText(/Add Staff/i);
  expect(addStaffButton).toBeInTheDocument();


  fireEvent.click(addStaffButton);

  const addNewStaffDialog = screen.getByText(/Add New Staff/i);
  expect(addNewStaffDialog).toBeInTheDocument();
});
