"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/allocation/page",{

/***/ "(app-pages-browser)/./app/comparison/card/Header-RF6.tsx":
/*!********************************************!*\
  !*** ./app/comparison/card/Header-RF6.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var _app_utils_wallet_Connect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/utils/wallet/Connect */ \"(app-pages-browser)/./app/utils/wallet/Connect.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst PAIRWISE_REPPORT_URL = \"https://github.com/GeneralMagicio/pairwise-rpgf5/issues/new?assignees=MoeNick&labels=&projects=&template=report-an-issue.md&title=%5BFeedback%5D+\";\nconst OPCharacter = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        src: \"/assets/images/op-character3.svg\",\n        alt: \"op character\",\n        width: 60,\n        height: 48,\n        unoptimized: true\n    }, void 0, false, {\n        fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n        lineNumber: 16,\n        columnNumber: 3\n    }, undefined);\n_c = OPCharacter;\nconst HeaderRF6 = (param)=>{\n    let { progress, category, question, isFirstSelection } = param;\n    _s();\n    const [isBarFixed, setIsBarFixed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleScroll = ()=>{\n            if (window.scrollY > 100) {\n                setIsBarFixed(true);\n            } else {\n                setIsBarFixed(false);\n            }\n        };\n        window.addEventListener(\"scroll\", handleScroll);\n        return ()=>{\n            window.removeEventListener(\"scroll\", handleScroll);\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative z-40 w-full bg-white border-bottom\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-col-reverse items-center justify-between px-6 py-4 md:px-12 lg:flex-row lg:px-4\",\n            children: [\n                !isFirstSelection && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center justify-between bg-white px-4 py-2\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(OPCharacter, {}, void 0, false, {\n                                fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n                                lineNumber: 55,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"ml-2 text-lg font-bold italic text-primary\",\n                                children: \"IMPACT = PROFIT\"\n                            }, void 0, false, {\n                                fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n                                lineNumber: 56,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n                    lineNumber: 53,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center gap-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"rounded-full bg-blue-100 px-3 py-1 text-center text-sm text-blue-link\",\n                            children: category\n                        }, void 0, false, {\n                            fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_utils_wallet_Connect__WEBPACK_IMPORTED_MODULE_3__.ConnectButton, {}, void 0, false, {\n                            fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n                            lineNumber: 66,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n                    lineNumber: 62,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n            lineNumber: 51,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/mahdighajary/Projects/pw-front-rf6/app/comparison/card/Header-RF6.tsx\",\n        lineNumber: 50,\n        columnNumber: 5\n    }, undefined);\n};\n_s(HeaderRF6, \"3pH326w8iKeOKiZM2Q8zt6ZiFV8=\");\n_c1 = HeaderRF6;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HeaderRF6);\nvar _c, _c1;\n$RefreshReg$(_c, \"OPCharacter\");\n$RefreshReg$(_c1, \"HeaderRF6\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wYXJpc29uL2NhcmQvSGVhZGVyLVJGNi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBbUQ7QUFDcEI7QUFDNEI7QUFFM0QsTUFBTUssdUJBQ0o7QUFTRixNQUFNQyxjQUF3QixrQkFDNUIsOERBQUNILGtEQUFLQTtRQUNKSSxLQUFJO1FBQ0pDLEtBQUk7UUFDSkMsT0FBTztRQUNQQyxRQUFRO1FBQ1JDLFdBQVc7Ozs7OztLQU5UTDtBQVVOLE1BQU1NLFlBQW1DO1FBQUMsRUFDeENDLFFBQVEsRUFDUkMsUUFBUSxFQUNSQyxRQUFRLEVBQ1JDLGdCQUFnQixFQUNqQjs7SUFDQyxNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR2pCLCtDQUFRQSxDQUFDO0lBRTdDQyxnREFBU0EsQ0FBQztRQUNSLE1BQU1pQixlQUFlO1lBQ25CLElBQUlDLE9BQU9DLE9BQU8sR0FBRyxLQUFLO2dCQUN4QkgsY0FBYztZQUNoQixPQUFPO2dCQUNMQSxjQUFjO1lBQ2hCO1FBQ0Y7UUFFQUUsT0FBT0UsZ0JBQWdCLENBQUMsVUFBVUg7UUFFbEMsT0FBTztZQUNMQyxPQUFPRyxtQkFBbUIsQ0FBQyxVQUFVSjtRQUN2QztJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDSztRQUFJQyxXQUFVO2tCQUNiLDRFQUFDRDtZQUFJQyxXQUFVOztnQkFDWixDQUFDVCxrQ0FDQSw4REFBQ1E7b0JBQUlDLFdBQVU7OEJBQ2IsNEVBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ25COzs7OzswQ0FDRCw4REFBQ29CO2dDQUFLRCxXQUFVOzBDQUE2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBTW5FLDhEQUFDRDtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNDOzRCQUFLRCxXQUFVO3NDQUNiWDs7Ozs7O3NDQUVILDhEQUFDVixvRUFBYUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLeEI7R0E5Q01RO01BQUFBO0FBZ0ROLCtEQUFlQSxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wYXJpc29uL2NhcmQvSGVhZGVyLVJGNi50c3g/Mjk0YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJztcbmltcG9ydCB7IENvbm5lY3RCdXR0b24gfSBmcm9tICdAL2FwcC91dGlscy93YWxsZXQvQ29ubmVjdCc7XG5cbmNvbnN0IFBBSVJXSVNFX1JFUFBPUlRfVVJMID1cbiAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9HZW5lcmFsTWFnaWNpby9wYWlyd2lzZS1ycGdmNS9pc3N1ZXMvbmV3P2Fzc2lnbmVlcz1Nb2VOaWNrJmxhYmVscz0mcHJvamVjdHM9JnRlbXBsYXRlPXJlcG9ydC1hbi1pc3N1ZS5tZCZ0aXRsZT0lNUJGZWVkYmFjayU1RCsnO1xuXG5pbnRlcmZhY2UgSGVhZGVyUHJvcHMge1xuICBwcm9ncmVzczogbnVtYmVyO1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBxdWVzdGlvbjogc3RyaW5nO1xuICBpc0ZpcnN0U2VsZWN0aW9uPzogYm9vbGVhbjtcbn1cblxuY29uc3QgT1BDaGFyYWN0ZXI6IFJlYWN0LkZDID0gKCkgPT4gKFxuICA8SW1hZ2VcbiAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vcC1jaGFyYWN0ZXIzLnN2Z1wiXG4gICAgYWx0PVwib3AgY2hhcmFjdGVyXCJcbiAgICB3aWR0aD17NjB9XG4gICAgaGVpZ2h0PXs0OH1cbiAgICB1bm9wdGltaXplZFxuICAvPlxuKTtcblxuY29uc3QgSGVhZGVyUkY2OiBSZWFjdC5GQzxIZWFkZXJQcm9wcz4gPSAoe1xuICBwcm9ncmVzcyxcbiAgY2F0ZWdvcnksXG4gIHF1ZXN0aW9uLFxuICBpc0ZpcnN0U2VsZWN0aW9uLFxufSkgPT4ge1xuICBjb25zdCBbaXNCYXJGaXhlZCwgc2V0SXNCYXJGaXhlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVTY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LnNjcm9sbFkgPiAxMDApIHtcbiAgICAgICAgc2V0SXNCYXJGaXhlZCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzQmFyRml4ZWQoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotNDAgdy1mdWxsIGJnLXdoaXRlIGJvcmRlci1ib3R0b21cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbC1yZXZlcnNlIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS00IG1kOnB4LTEyIGxnOmZsZXgtcm93IGxnOnB4LTRcIj5cbiAgICAgICAgeyFpc0ZpcnN0U2VsZWN0aW9uICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBiZy13aGl0ZSBweC00IHB5LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPE9QQ2hhcmFjdGVyIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTIgdGV4dC1sZyBmb250LWJvbGQgaXRhbGljIHRleHQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgIElNUEFDVCA9IFBST0ZJVFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJvdW5kZWQtZnVsbCBiZy1ibHVlLTEwMCBweC0zIHB5LTEgdGV4dC1jZW50ZXIgdGV4dC1zbSB0ZXh0LWJsdWUtbGlua1wiPlxuICAgICAgICAgICAge2NhdGVnb3J5fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8Q29ubmVjdEJ1dHRvbiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyUkY2O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJJbWFnZSIsIkNvbm5lY3RCdXR0b24iLCJQQUlSV0lTRV9SRVBQT1JUX1VSTCIsIk9QQ2hhcmFjdGVyIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJ1bm9wdGltaXplZCIsIkhlYWRlclJGNiIsInByb2dyZXNzIiwiY2F0ZWdvcnkiLCJxdWVzdGlvbiIsImlzRmlyc3RTZWxlY3Rpb24iLCJpc0JhckZpeGVkIiwic2V0SXNCYXJGaXhlZCIsImhhbmRsZVNjcm9sbCIsIndpbmRvdyIsInNjcm9sbFkiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpdiIsImNsYXNzTmFtZSIsInNwYW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/comparison/card/Header-RF6.tsx\n"));

/***/ })

});