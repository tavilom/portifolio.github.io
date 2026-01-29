import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";

export interface AppRoute {
  path: string;
  element: ReactElement;
  children?: AppRoute[];
}

import { HomeRoutes } from "./Home.routes";

// use o array diretamente (ou espalhe)
const allRoutes: AppRoute[] = HomeRoutes; // ou: [...HomeRoutes]

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        {allRoutes.map(({ path, element, children }) => (
          <Route key={path} path={path} element={element}>
            {children?.map(({ path: childPath, element: childElement }) => (
              <Route key={childPath} path={childPath} element={childElement} />
            ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};
