import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

function SecurityScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function(){
  // Block F12, Ctrl+Shift+I/J, Ctrl+U
  document.addEventListener("keydown", function(e){
    if(e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || (e.ctrlKey && e.key === "U")){
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Block right-click context menu
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
    return false;
  });

  // Devtools detection via window size trick
  var threshold = 160;
  var check = function(){
    var w = window.outerWidth - window.innerWidth;
    var h = window.outerHeight - window.innerHeight;
    if(w > threshold || h > threshold){
      document.body.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;min-height:100vh;background:#08080f;color:#f7f4ff;font-family:sans-serif;text-align:center;padding:2rem'><div><h1 style='font-size:1.5rem;margin-bottom:1rem'>Developer tools detected</h1><p style='color:#aaa4b5;max-width:400px'>This action has been logged. Please close developer tools to continue using DiaMart.</p></div></div>";
    }
  };
  setInterval(check, 2000);
})();
`,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SecurityScript />
        {children}
      </body>
    </html>
  );
}
