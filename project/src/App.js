"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const Header_1 = __importDefault(require("./components/Header"));
const Home_1 = __importDefault(require("./pages/Home"));
const Assessment_1 = __importDefault(require("./pages/Assessment"));
const Results_1 = __importDefault(require("./pages/Results"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Resources_1 = __importDefault(require("./pages/Resources"));
const AssessmentContext_1 = require("./context/AssessmentContext");
function App() {
    return (<AssessmentContext_1.AssessmentProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header_1.default />
        <framer_motion_1.motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="pt-16">
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
            <react_router_dom_1.Route path="/assessment" element={<Assessment_1.default />}/>
            <react_router_dom_1.Route path="/results" element={<Results_1.default />}/>
            <react_router_dom_1.Route path="/dashboard" element={<Dashboard_1.default />}/>
            <react_router_dom_1.Route path="/resources" element={<Resources_1.default />}/>
          </react_router_dom_1.Routes>
        </framer_motion_1.motion.main>
      </div>
    </AssessmentContext_1.AssessmentProvider>);
}
exports.default = App;
