import { render } from "@testing-library/react";
import StaffForm from "@/components/StaffForm";

describe("StaffForm", () => {
  test("renders StaffForm component without crashing", () => {
    const handleClose = jest.fn();

    render(<StaffForm handleClose={handleClose} />);
  });
});