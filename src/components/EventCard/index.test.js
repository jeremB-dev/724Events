import { render, screen } from "@testing-library/react";
import EventCard from "./index";

// Fonction pour matcher le texte
const textMatcher = (content, element) => {
  const hasText = (node) => node.textContent === content;
  const node = element.children || [];
  return Array.from(node).some(hasText);
};

describe("When an event card is created", () => {
  it("an image is displayed with alt value", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        date={new Date("2022-04-01")}
        title="test event"
        label="test label"
      />
    );
    const imageElement = screen.getByAltText("image-alt-text"); // Récupération de l'élément image par son attribut alt
    expect(imageElement).toBeInTheDocument();
  });

  it("a title, a label and a month are displayed", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        date={new Date("2022-04-01")}
        title="test event"
        label="test label"
      />
    );
    const titleElement = screen.getByText(/test event/);
    const monthElement = screen.getByText((content, element) =>
      textMatcher("Avril", element)
    );
    const labelElement = screen.getByText(/test label/);
    expect(titleElement).toBeInTheDocument();
    expect(monthElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });
});
