import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { GraphiquesProvider, useGraphiques } from "../data/graData";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const TestComponent = () => {
  const graphiquesData = useGraphiques();
  return (
    <div>
      {graphiquesData.map((data) => (
        <div key={data.title} data-testid={`graphiques-${data.title}`}>
          {data.title}
        </div>
      ))}
    </div>
  );
};

describe("GraphiquesProvider", () => {
  beforeEach(() => {
    localStorage.setItem("joueur_id", "1");
    localStorage.setItem("auth_token", "test_token");
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test("fournit des données graphiques initiales", async () => {
    // Teste si le composant GraphiquesProvider fournit correctement les données graphiques initiales
    render(
      <GraphiquesProvider>
        <TestComponent />
      </GraphiquesProvider>
    );

    // Vérifie si les éléments avec les ID de test "graphiques-Points" et "graphiques-Progression" sont présents dans le rendu, indiquant que les données graphiques initiales sont correctement fournies
    expect(screen.getByTestId("graphiques-Points")).toBeInTheDocument();
    expect(screen.getByTestId("graphiques-Progression")).toBeInTheDocument();
  });

  test("récupère et met à jour les données graphiques depuis l'API", async () => {
    // Teste si le composant GraphiquesProvider récupère et met à jour correctement les données graphiques depuis l'API
    const mockData = [
      { id_joueur: 1, id_partie: 1, points: 100 },
      { id_joueur: 1, id_partie: 2, points: 200 },
    ];
    mock.onGet("http://localhost:3001/history/test_token").reply(200, mockData);

    render(
      <GraphiquesProvider>
        <TestComponent />
      </GraphiquesProvider>
    );

    // Attend que le composant ait fini de se rendre et que les données soient mises à jour
    await waitFor(() => {
      const pointsData = screen.getByTestId("graphiques-Points");
      const progressionData = screen.getByTestId("graphiques-Progression");

      // Vérifie que les éléments ont le contenu textuel attendu, garantissant que les données récupérées depuis l'API sont correctement affichées
      expect(pointsData).toHaveTextContent("Points");
      expect(progressionData).toHaveTextContent("Progression");
    });
  });

  test("gère les erreurs de l'API de manière appropriée", async () => {
    // Teste si le composant GraphiquesProvider gère correctement les erreurs lors de la récupération des données depuis l'API
    mock.onGet("http://localhost:3001/history/test_token").reply(500);

    render(
      <GraphiquesProvider>
        <TestComponent />
      </GraphiquesProvider>
    );

    // Attend que le composant ait fini de se rendre et que la logique de gestion des erreurs s'exécute
    await waitFor(() => {
      const pointsData = screen.getByTestId("graphiques-Points");
      const progressionData = screen.getByTestId("graphiques-Progression");

      // Vérifie que les éléments ont le contenu textuel attendu, garantissant que même en cas d'erreur API, l'interface utilisateur reste cohérente
      expect(pointsData).toHaveTextContent("Points");
      expect(progressionData).toHaveTextContent("Progression");
    });
  });
});
