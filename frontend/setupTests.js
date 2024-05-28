import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet(/\/joueurs\/id\/.+/).reply(200, [{ pseudo: "Player1" }]);
mock
  .onGet(/\/history\/.+/)
  .reply(200, [
    { timestamp: "2021-01-01T00:00:00Z" },
    { timestamp: "2021-01-02T00:00:00Z" },
  ]);
