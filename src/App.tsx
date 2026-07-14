import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeProvider } from "@/components/theme_select/theme-provider";
import { ModeToggle } from "@/components/theme_select/mode-toggle";
import Tags from "@/pages/tags";
import Buckets from "@/pages/buckets";
import Transactions from "@/pages/transactions";

const navItems = [
  { title: "Tags", url: "/" },
  { title: "Buckets", url: "/buckets" },
  { title: "Transactions", url: "/transactions" },
];

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <header className="border-b">
          <div className="flex h-14 items-center justify-between px-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.url}>
                    <NavigationMenuLink
                      render={<Link to={item.url} />}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <ModeToggle />
          </div>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Tags />} />
            <Route path="/buckets" element={<Buckets />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
