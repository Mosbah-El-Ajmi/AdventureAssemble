import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Carte from "../components/Carte";
// Mock axios
const mock = new MockAdapter(axios);

const graphiquesData = {
  title: "Points",
  color: {
    backGround: "linear-gradient(180deg, blueviolet 0%, blueviolet 100%)",
    boxShadow: "0px 10px 20px 0px #e0c6f5",
  },
  barValue: 50,
  value: "150",
  png: () => <div>Icon</div>,
  series: [
    {
      name: "Points",
      data: [10, 20, 30],
    },
  ],
};

describe("Composant Carte", () => {
  beforeEach(() => {
    localStorage.setItem("joueur_id", "1");
    localStorage.setItem("auth_token", "test_token");
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test("rend initialement CompactCard", () => {
    // Teste si le composant Carte rend initialement CompactCard
    render(<Carte graphiquesData={graphiquesData} />);

    // Vérifie si les éléments attendus sont présents dans le rendu initial
    expect(screen.getByText("Points")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  test("s'étend en ExpandedCard au clic", async () => {
    // Teste si le composant Carte s'étend en ExpandedCard lors du clic
    render(<Carte graphiquesData={graphiquesData} />);

    // Simule un clic sur le titre "Points"
    fireEvent.click(screen.getByText("Points"));

    // Attend que le composant passe en mode "étendu" et vérifie si les éléments attendus sont présents
    await waitFor(() => {
      expect(screen.getByText("Points")).toBeInTheDocument();
      expect(screen.getByText("Icon")).toBeInTheDocument();
    });
  });

  test("récupère le nom du joueur et l'historique lors du montage", async () => {
    // Teste si le composant Carte récupère le nom du joueur et son historique lors du montage
    mock
      .onGet("http://localhost:3001/joueurs/id/1/test_token")
      .reply(200, [{ pseudo: "Player1" }]);

    mock.onGet("http://localhost:3001/history/test_token").reply(200, [
      { id_joueur: 1, timestamp: "2024-01-01T12:00:00Z", points: 100 },
      { id_joueur: 1, timestamp: "2024-01-02T12:00:00Z", points: 200 },
    ]);

    render(<Carte graphiquesData={graphiquesData} />);

    // Attend que le nom du joueur soit affiché
    await waitFor(() => {
      expect(screen.getByText("Player1")).toBeInTheDocument();
    });
  });

  test("gère les erreurs de l'API de manière appropriée", async () => {
    // Teste si le composant Carte gère correctement les erreurs de l'API
    mock.onGet("http://localhost:3001/joueurs/id/1/test_token").reply(500);
    mock.onGet("http://localhost:3001/history/test_token").reply(500);

    render(<Carte graphiquesData={graphiquesData} />);

    // Attend que le composant gère les erreurs de manière appropriée
    await waitFor(() => {
      // Vérifie s'il n'y a pas de plantage du composant en cas d'erreur API
      expect(screen.getByText("Points")).toBeInTheDocument();
    });
  });
});
