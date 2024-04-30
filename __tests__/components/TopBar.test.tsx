import { render, screen } from "@testing-library/react";
import TopBar from "@/components/TopBar";

describe("TopBar", () => {
  test("renders TopBar component with title", () => {
    const mockToggleTheme = jest.fn();

    render(<TopBar toggleTheme={mockToggleTheme} />);

    const titleElement = screen.getByRole("heading", { name: /Health Team Admin/i });
    expect(titleElement).toBeInTheDocument();
  });
});