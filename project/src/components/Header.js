"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const location = (0, react_router_dom_1.useLocation)();
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/assessment', label: 'Assessment' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/resources', label: 'Resources' },
    ];
    return (<framer_motion_1.motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <react_router_dom_1.Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <lucide_react_1.Brain className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors"/>
              <lucide_react_1.Heart className="h-4 w-4 text-danger-500 absolute -top-1 -right-1 animate-pulse"/>
            </div>
            <span className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
              MindWell
            </span>
          </react_router_dom_1.Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (<react_router_dom_1.Link key={item.path} to={item.path} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === item.path
                ? 'bg-primary-100 text-primary-700'
                : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'}`}>
                {item.label}
              </react_router_dom_1.Link>))}
          </nav>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors">
            {isMenuOpen ? <lucide_react_1.X className="h-6 w-6"/> : <lucide_react_1.Menu className="h-6 w-6"/>}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (<framer_motion_1.motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden py-4 border-t border-secondary-200">
            {navItems.map((item) => (<react_router_dom_1.Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'}`}>
                {item.label}
              </react_router_dom_1.Link>))}
          </framer_motion_1.motion.nav>)}
      </div>
    </framer_motion_1.motion.header>);
};
exports.default = Header;
