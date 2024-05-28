import React from "react";
import { render, screen } from "@testing-library/react";
import Graphiques from "../components/Graphiques";
import { GraphiquesProvider } from "../data/graData";

// Simulation du composant Carte pour isoler les tests sur Graphiques et graData
jest.mock("../components/Carte", () => ({ graphiquesData }) => (
  <div data-testid={`carte-${graphiquesData.title}`}>
    {graphiquesData.title}
  </div>
));

describe("Composant Graphiques", () => {
  test("rend le composant Graphiques avec deux composants Carte", () => {
    // Rend le composant Graphiques enveloppé dans le fournisseur de données graphiques
    render(
      <GraphiquesProvider>
        <Graphiques />
      </GraphiquesProvider>
    );

    // Récupère les composants Carte rendus avec les titres "Points" et "Progression"
    const pointsCarte = screen.getByTestId("carte-Points");
    const progressionCarte = screen.getByTestId("carte-Progression");

    // Vérifie si les composants Carte sont présents dans le rendu du composant Graphiques
    expect(pointsCarte).toBeInTheDocument();
    expect(progressionCarte).toBeInTheDocument();
  });
});
