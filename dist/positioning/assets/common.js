/**
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

"use strict";

{

   var versions = {
      3: {
         version: "3.0",
         link: "https://creativecommons.org/licenses/by/3.0/au/"
      },
      4: {
         version: "4.0",
         link: "https://creativecommons.org/licenses/by/4.0/"
      }
   };

   angular.module("common.cc", []).directive('commonCc', [function () {
      return {
         templateUrl: 'common/cc/cc.html',
         scope: {
            version: "=?"
         },
         link: function link(scope) {
            if (!scope.version) {
               scope.details = versions[4];
            } else {
               scope.details = versions[scope.version];
            }
            scope.template = 'common/cc/cctemplate.html';
         }
      };
   }]);
}
'use strict';

(function (angular) {

	'use strict';

	angular.module('common.header', []).controller('headerController', ['$scope', '$q', '$timeout', function ($scope, $q, $timeout) {

		var modifyConfigSource = function modifyConfigSource(headerConfig) {
			return headerConfig;
		};

		$scope.$on('headerUpdated', function (event, args) {
			$scope.headerConfig = modifyConfigSource(args);
		});
	}]).directive('icsmHeader', [function () {
		var defaults = {
			current: "none",
			heading: "ICSM",
			headingtitle: "ICSM",
			helpurl: "help.html",
			helptitle: "Get help about ICSM",
			helpalttext: "Get help about ICSM",
			skiptocontenttitle: "Skip to content",
			skiptocontent: "Skip to content",
			quicklinksurl: "/search/api/quickLinks/json?lang=en-US"
		};
		return {
			transclude: true,
			restrict: 'EA',
			templateUrl: "common/header/header.html",
			scope: {
				current: "=",
				breadcrumbs: "=",
				heading: "=",
				headingtitle: "=",
				helpurl: "=",
				helptitle: "=",
				helpalttext: "=",
				skiptocontenttitle: "=",
				skiptocontent: "=",
				quicklinksurl: "="
			},
			link: function link(scope, element, attrs) {
				var data = angular.copy(defaults);
				angular.forEach(defaults, function (value, key) {
					if (!(key in scope)) {
						scope[key] = value;
					}
				});
			}
		};
	}]).factory('headerService', ['$http', function () {}]);
})(angular);
'use strict';

angular.module('common.accordion', ['ui.bootstrap.collapse']).constant('commonAccordionConfig', {
  closeOthers: true
}).controller('commonAccordionController', ['$scope', '$attrs', 'commonAccordionConfig', function ($scope, $attrs, accordionConfig) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function (openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(this.groups, function (group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function (groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function (group) {
    var index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  };
}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('commonAccordion', function () {
  return {
    controller: 'commonAccordionController',
    controllerAs: 'accordion',
    transclude: true,
    templateUrl: function templateUrl(element, attrs) {
      return attrs.templateUrl || 'common/accordion/accordion.html';
    }
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('commonAccordionGroup', function () {
  return {
    require: '^commonAccordion', // We need this directive to be inside an accordion
    transclude: true, // It transcludes the contents of the directive into the template
    restrict: 'A',
    templateUrl: function templateUrl(element, attrs) {
      return attrs.templateUrl || 'common/accordion/accordionGroup.html';
    },
    scope: {
      heading: '@', // Interpolate the heading attribute onto this scope
      panelClass: '@?', // Ditto with panelClass
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function controller() {
      this.setHeading = function (element) {
        this.heading = element;
      };
    },
    link: function link(scope, element, attrs, accordionCtrl) {
      element.addClass('panel');
      accordionCtrl.addGroup(scope);

      scope.openClass = attrs.openClass || 'panel-open';
      scope.panelClass = attrs.panelClass || 'panel-default';
      scope.$watch('isOpen', function (value) {
        element.toggleClass(scope.openClass, !!value);
        if (value) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function ($event) {
        if (!scope.isDisabled) {
          if (!$event || $event.which === 32) {
            scope.isOpen = !scope.isOpen;
          }
        }
      };

      var id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
      scope.headingId = id + '-tab';
      scope.panelId = id + '-panel';
    }
  };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
.directive('commonAccordionHeading', function () {
  return {
    transclude: true, // Grab the contents to be used as the heading
    template: '', // In effect remove this element!
    replace: true,
    require: '^commonAccordionGroup',
    link: function link(scope, element, attrs, accordionGroupCtrl, transclude) {
      // Pass the heading to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('commonAccordionTransclude', function () {
  return {
    require: '^commonAccordionGroup',
    link: function link(scope, element, attrs, controller) {
      scope.$watch(function () {
        return controller[attrs.commonAccordionTransclude];
      }, function (heading) {
        if (heading) {
          var elem = angular.element(element[0].querySelector(getHeaderSelectors()));
          elem.html('');
          elem.append(heading);
        }
      });
    }
  };

  function getHeaderSelectors() {
    return 'common-accordion-header,' + 'data-common-accordion-header,' + 'x-common-accordion-header,' + 'common\\:accordion-header,' + '[common-accordion-header],' + '[data-common-accordion-header],' + '[x-common-accordion-header]';
  }
});
'use strict';

(function (angular) {
   'use strict';

   angular.module('common.iso19115', ['common.recursionhelper']).directive('iso19115Metadata', [function () {
      return {
         templateUrl: 'common/iso19115/metadata.html',
         scope: {
            node: "="
         }
      };
   }]).directive('iso19115Contact', [function () {
      return {
         templateUrl: 'common/iso19115/contact.html',
         restrict: "AE",
         scope: {
            node: "="
         }

      };
   }]).directive('iso19115Double', [function () {
      return {
         templateUrl: 'common/iso19115/double.html',
         restrict: "AE",
         scope: {
            node: "=",
            name: "@",
            type: "@"
         },
         link: function link(scope) {
            if (scope.node) {
               scope.value = scope.node[scope.name][scope.type];
            }
         }

      };
   }]).directive('iso19115Node', [function () {
      var converters = {
         CharacterString: function CharacterString(node) {
            if (node && node.CharacterString) {
               return node.CharacterString.__text;
            }
            return null;
         },
         LanguageCode: function LanguageCode(node) {
            if (node && node.LanguageCode) {
               return node.LanguageCode._codeListValue;
            }
            return null;
         },
         MD_CharacterSetCode: function MD_CharacterSetCode(node) {
            if (node && node.MD_CharacterSetCode) {
               return node.LanguageCode._codeListValue;
            }
            return null;
         },
         _codeListValue: function _codeListValue(node) {
            if (node) {
               return node._codeListValue;
            }
            return null;
         }
      };

      return {
         template: '<ul><li><span class="iso19115-head" ng-show="display">{{display}}:</span> <span class="iso19115-value">{{value}}</span></li></ul>',
         restrict: "AE",
         replace: true,
         scope: {
            node: "=",
            name: "@",
            type: "@"
         },
         link: function link(scope) {
            scope.display = nodeName(scope.name);
            scope.value = converters[scope.type](scope.node);
         }
      };
   }]).filter('iso19115NodeName', [function () {
      return nodeName;
   }]);

   function nodeName(nodeName) {
      if (nodeName.toUpperCase() == nodeName) {
         return nodeName;
      }
      var parts = nodeName.split("_");
      var name = parts[parts.length - 1];
      return name.replace(/./, function (f) {
         return f.toUpperCase();
      }).replace(/([A-Z])/g, ' $1').trim();
   }
})(angular);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (angular) {
   'use strict';

   angular.module("common.metaview", []).directive('commonMetaview', ['metaviewService', function (metaviewService) {
      return {
         templateUrl: 'common/metaview/metaview.html',
         restrict: "AE",
         scope: {
            url: "=",
            container: "=",
            item: "="
         },
         link: function link(scope) {
            console.log("URL = " + scope.url);
            scope.select = function () {
               metaviewService.get(scope.url, { cache: true }).then(function (data) {
                  scope.item.metadata = data;
                  scope.container.selected = scope.item;
               });
            };
         }
      };
   }]).directive('commonItemMetaview', [function () {
      return {
         templateUrl: 'common/metaview/item.html',
         restrict: "AE",
         scope: {
            container: "="
         },
         link: function link(scope) {}
      };
   }]).directive('metaviewIso19115', [function () {
      return {
         templateUrl: 'common/metaview/iso19115.html',
         restrict: "AE",
         scope: {
            data: "="
         },
         link: function link(scope) {}
      };
   }]).directive('metaviewIso19115Array', ['RecursionHelper', function (RecursionHelper) {
      function link(scope) {
         scope.isObject = function () {
            return angular.isObject(scope.node);
         };

         scope.getKeys = function () {
            if (scope.isObject()) {
               return Object.keys(scope.node).filter(function (key) {
                  return !(excludeNodes[key] || key.indexOf(":") > -1);
               }).map(function (key) {
                  if (key === '') {
                     return '""';
                  }
                  return key;
               });
            }
         };
      }

      return {
         template: '<metaview-node ng-repeat="nextKey in getKeys() track by $index" node="node[nextKey]" key="nextKey"></metaview-node>',
         restrict: "AE",
         scope: {
            data: "="
         },
         compile: function compile(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return RecursionHelper.compile(element, link);
         }
      };
   }]).directive('metaviewIso19115Node', ['RecursionHelper', function (RecursionHelper) {
      var excludeNodes = {
         $$hashKey: true,
         __prefix: true,
         __text: true,
         _codeList: true,
         _codeListValue: true,
         CharacterString: true,
         DateTime: true,
         LanguageCode: true,
         MD_ScopeCode: true,
         scopeCode: true
      };
      function link(scope) {
         scope.isObject = function () {
            return angular.isObject(scope.node);
         };

         scope.getKeys = function () {
            if (scope.isObject()) {
               return Object.keys(scope.node).filter(function (key) {
                  return !(excludeNodes[key] || key.indexOf(":") > -1);
               }).map(function (key) {
                  if (key === '') {
                     return '""';
                  }
                  return key;
               });
            }
         };

         scope.isArray = function () {
            return angular.isArray(scope.node);
         };
      }

      return {
         templateUrl: 'common/metaview/iso19115node.html',
         restrict: "E",
         replace: true,
         scope: {
            node: "=",
            key: "=",
            array: "="
         },
         compile: function compile(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return RecursionHelper.compile(element, link);
         }
      };
   }]).filter('metaviewText', [function () {
      var keyChild = {
         CharacterString: "__text",
         DateTime: "__text",
         LanguageCode: "_codeListValue",
         linkage: ["URL", "__text"],
         MD_ScopeCode: "_codeListValue",
         _codeListValue: "#text"
      },
          keys = [];

      angular.forEach(keyChild, function (value, key) {
         this.push(key);
      }, keys);

      return function (node) {
         var value = null;
         if (node) {
            keys.some(function (key) {
               var child = node[key];
               if (child) {
                  var children = keyChild[key];
                  if (!Array.isArray(children)) {
                     children = [children];
                  }

                  var result = child;
                  children.forEach(function (kid) {
                     if (kid !== "#text") {
                        result = result[kid];
                     }
                  });

                  value = result; //child[keyChild[key]];
                  return true;
               }
               return false;
            });
         }
         return value;
      };
   }]).filter('metaviewNodeName', [function () {
      return function (nodeName) {
         if (parseInt(nodeName) + "" === "" + nodeName) {
            console.log("Its a num");
            return "";
         }
         if (nodeName.toUpperCase() === nodeName) {
            return nodeName;
         }
         var parts = nodeName.split("_");
         var name = parts[parts.length - 1];
         return name.replace(/./, function (f) {
            return f.toUpperCase();
         }).replace(/([A-Z])/g, ' $1').trim();
      };
   }]).filter('metaviewTransform', [function () {
      return function (node, key) {
         if (node.CharacterString) {
            return node.CharacterString.__text;
         }
         return node;
      };
   }]).provider('metaviewService', function MetaviewServiceProvider() {
      var proxy = "xml2js/";

      this.proxy = function (newProxy) {
         proxy = newProxy;
      };

      this.$get = ['$http', function ($http) {
         return new MetaviewService(proxy, $http);
      }];
   });

   var MetaviewService = function () {
      function MetaviewService(proxy, $http) {
         _classCallCheck(this, MetaviewService);

         this.proxy = proxy;
         this.http = $http;
      }

      _createClass(MetaviewService, [{
         key: 'get',
         value: function get(url) {
            return this.http.get(this.proxy + url).then(function (response) {
               return response.data;
            });
         }
      }]);

      return MetaviewService;
   }();
})(angular);
'use strict';

(function (angular) {

	'use strict';

	angular.module('common.altthemes', [])

	/**
 	*
 	* Override the original mars user.
 	*
 	  */
	.directive('altThemes', ['altthemesService', function (themesService) {
		return {
			restrict: 'AE',
			templateUrl: 'common/navigation/altthemes.html',
			scope: {
				current: "="
			},
			link: function link(scope) {
				themesService.getThemes().then(function (themes) {
					scope.themes = themes;
				});

				themesService.getCurrentTheme().then(function (theme) {
					scope.theme = theme;
				});

				scope.changeTheme = function (theme) {
					scope.theme = theme;
					themesService.setTheme(theme.key);
				};
			}
		};
	}]).controller('altthemesCtrl', ['altthemesService', function (altthemesService) {
		this.service = altthemesService;
	}]).filter('altthemesFilter', function () {
		return function (features, theme) {
			var response = [];
			// Give 'em all if they haven't set a theme.
			if (!theme) {
				return features;
			}

			if (features) {
				features.forEach(function (feature) {
					if (feature.themes) {
						if (feature.themes.some(function (name) {
							return name === theme.key;
						})) {
							response.push(feature);
						}
					}
				});
			}
			return response;
		};
	}).factory('altthemesService', ['$q', '$http', 'storageService', function ($q, $http, storageService) {
		var THEME_PERSIST_KEY = 'positioning.current.theme';
		var THEMES_LOCATION = 'positioning/resources/config/themes.json';
		var DEFAULT_THEME = "All";
		var waiting = [];
		var self = this;

		this.themes = [];
		this.theme = null;

		storageService.getItem(THEME_PERSIST_KEY).then(function (value) {
			if (!value) {
				value = DEFAULT_THEME;
			}
			$http.get(THEMES_LOCATION, { cache: true }).then(function (response) {
				var themes = response.data.themes;

				self.themes = themes;
				self.theme = themes[value];
				// Decorate the key
				angular.forEach(themes, function (theme, key) {
					theme.key = key;
				});
				waiting.forEach(function (wait) {
					wait.resolve(self.theme);
				});
			});
		});

		this.getCurrentTheme = function () {
			if (this.theme) {
				return $q.when(self.theme);
			} else {
				var waiter = $q.defer();
				waiting.push(waiter);
				return waiter.promise;
			}
		};

		this.getThemes = function () {
			return $http.get(THEMES_LOCATION, { cache: true }).then(function (response) {
				return response.data.themes;
			});
		};

		this.setTheme = function (key) {
			this.theme = this.themes[key];
			storageService.setItem(THEME_PERSIST_KEY, key);
		};

		return this;
	}]).filter('altthemesEnabled', function () {
		return function (headers) {
			if (headers) {
				return headers.filter(function (value) {
					return !!value.enabled;
				});
			}
			return headers;
		};
	}).filter('altthemesMatchCurrent', function () {
		return function (headers, current) {
			if (headers) {
				return headers.filter(function (value) {
					return !!value.keys.find(function (key) {
						return key === current;
					});
				});
			}
			return headers;
		};
	});
})(angular);
'use strict';

(function (angular) {
  'use strict';

  angular.module('common.navigation', [])
  /**
   *
   * Override the original mars user.
   *
   */
  .directive('commonNavigation', [function () {
    return {
      restrict: 'AE',
      template: "<alt-themes current='current'></alt-themes>",
      scope: {
        current: "=?"
      },
      link: function link(scope) {
        scope.username = "Anonymous";
        if (!scope.current) {
          scope.current = "none";
        }
      }
    };
  }]).factory('navigationService', [function () {
    return {};
  }]);
})(angular);
"use strict";

{
   angular.module("common.proxy", []).provider("proxy", function () {

      this.$get = ['$http', '$q', function ($http, $q) {
         var base = "proxy/";

         this.setProxyBase = function (newBase) {
            base = newBase;
         };

         return {
            get: function get(url, options) {
               return this._method("get", url, options);
            },

            post: function post(url, options) {
               return this._method("post", url, options);
            },

            put: function put(url, options) {
               return this._method("put", url, options);
            },

            _method: function _method(method, url, options) {
               return $http[method](base + url, options).then(function (response) {
                  return response.data;
               });
            }
         };
      }];
   });
}
"use strict";

(function (angular) {
	'use strict';

	angular.module("common.panes", []).directive("icsmPanes", ['$rootScope', '$timeout', 'mapService', function ($rootScope, $timeout, mapService) {
		return {
			templateUrl: "common/panes/panes.html",
			transclude: true,
			replace: true,
			scope: {
				defaultItem: "@",
				data: "="
			},
			controller: ['$scope', function ($scope) {
				var changeSize = false;

				$scope.view = $scope.defaultItem;

				$scope.setView = function (what) {
					var oldView = $scope.view;

					if ($scope.view == what) {
						if (what) {
							changeSize = true;
						}
						$scope.view = "";
					} else {
						if (!what) {
							changeSize = true;
						}
						$scope.view = what;
					}

					$rootScope.$broadcast("view.changed", $scope.view, oldView);

					if (changeSize) {
						mapService.getMap().then(function (map) {
							map._onResize();
						});
					}
				};
				$timeout(function () {
					$rootScope.$broadcast("view.changed", $scope.view, null);
				}, 50);
			}]
		};
	}]).directive("icsmTabs", [function () {
		return {
			templateUrl: "common/panes/tabs.html",
			require: "^icsmPanes"
		};
	}]).controller("PaneCtrl", PaneCtrl).factory("paneService", PaneService);

	PaneCtrl.$inject = ["paneService"];
	function PaneCtrl(paneService) {
		var _this = this;

		paneService.data().then(function (data) {
			_this.data = data;
		});
	}

	PaneService.$inject = [];
	function PaneService() {
		var data = {};

		return {
			add: function add(item) {},

			remove: function remove(item) {}
		};
	}
})(angular);
'use strict';

(function (angular) {
  'use strict';

  // from http://stackoverflow.com/a/18609594

  angular.module('common.recursionhelper', []).factory('RecursionHelper', ['$compile', function ($compile) {
    return {
      /**
       * Manually compiles the element, fixing the recursion loop.
       * @param element
       * @param [link] A post-link function, or an object with function(s)
       * registered via pre and post properties.
       * @returns An object containing the linking functions.
       */
      compile: function compile(element, link) {
        // Normalize the link parameter
        if (angular.isFunction(link)) {
          link = { post: link };
        }

        // Break the recursion loop by removing the contents
        var contents = element.contents().remove();
        var compiledContents;
        return {
          pre: link && link.pre ? link.pre : null,
          /**
           * Compiles and re-adds the contents
           */
          post: function post(scope, element) {
            // Compile the contents
            if (!compiledContents) {
              compiledContents = $compile(contents);
            }
            // Re-add the compiled contents to the element
            compiledContents(scope, function (clone) {
              element.append(clone);
            });

            // Call the post-linking function, if any
            if (link && link.post) {
              link.post.apply(null, arguments);
            }
          }
        };
      }
    };
  }]);
})(angular);
"use strict";

(function (angular) {
   'use strict';

   angular.module("common.scroll", []).directive("commonScroller", ['$timeout', function ($timeout) {
      return {
         scope: {
            more: "&",
            buffer: "=?"
         },
         link: function link(scope, element, attrs) {
            var fetching;
            if (!scope.buffer) scope.buffer = 100;

            element.on("scroll", function (event) {
               var target = event.currentTarget;
               $timeout.cancel(fetching);
               fetching = $timeout(bouncer, 120);

               function bouncer() {
                  if (scope.more && target.scrollHeight - target.scrollTop <= target.clientHeight + scope.buffer) {
                     scope.more();
                  }
               }
            });
         }
      };
   }]);
})(angular);
'use strict';

(function (angular) {
	'use strict';

	angular.module("common.storage", ['explorer.projects']).factory("storageService", ['$log', '$q', 'projectsService', function ($log, $q, projectsService) {
		return {
			setGlobalItem: function setGlobalItem(key, value) {
				this._setItem("_system", key, value);
			},

			setItem: function setItem(key, value) {
				projectsService.getCurrentProject().then(function (project) {
					this._setItem(project, key, value);
				}.bind(this));
			},

			_setItem: function _setItem(project, key, value) {
				$log.debug("Fetching state for key locally" + key);
				localStorage.setItem("mars.anon." + project + "." + key, JSON.stringify(value));
			},

			getGlobalItem: function getGlobalItem(key) {
				return this._getItem("_system", key);
			},

			getItem: function getItem(key) {
				var deferred = $q.defer();
				projectsService.getCurrentProject().then(function (project) {
					this._getItem(project, key).then(function (response) {
						deferred.resolve(response);
					});
				}.bind(this));
				return deferred.promise;
			},

			_getItem: function _getItem(project, key) {
				$log.debug("Fetching state locally for key " + key);
				var item = localStorage.getItem("mars.anon." + project + "." + key);
				if (item) {
					try {
						item = JSON.parse(item);
					} catch (e) {
						// Do nothing as it will be a string
					}
				}
				return $q.when(item);
			}
		};
	}]);
})(angular);
"use strict";

(function (angular) {

	'use strict';

	angular.module("common.toolbar", []).directive("icsmToolbar", [function () {
		return {
			controller: 'toolbarLinksCtrl'
		};
	}])

	/**
  * Override the default mars tool bar row so that a different implementation of the toolbar can be used.
  */
	.directive('icsmToolbarRow', [function () {
		var DEFAULT_TITLE = "Satellite to Topography bias on base map.";

		return {
			scope: {
				map: "=",
				overlaytitle: "=?"
			},
			restrict: 'AE',
			templateUrl: 'common/toolbar/toolbar.html',
			link: function link(scope) {
				scope.overlaytitle = scope.overlaytitle ? scope.overlaytitle : DEFAULT_TITLE;
			}
		};
	}]).controller("toolbarLinksCtrl", ["$scope", "configService", function ($scope, configService) {

		var self = this;
		configService.getConfig().then(function (config) {
			self.links = config.toolbarLinks;
		});

		$scope.item = "";
		$scope.toggleItem = function (item) {
			$scope.item = $scope.item == item ? "" : item;
		};
	}]);
})(angular);
angular.module("common.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("common/cc/cc.html","<button type=\"button\" class=\"undecorated\" title=\"View CCBy {{details.version}} licence details\"\r\n      popover-trigger=\"outsideClick\"\r\n      uib-popover-template=\"template\" popover-placement=\"bottom\" popover-append-to-body=\"true\">\r\n	<i ng-class=\"{active:data.isWmsShowing}\" class=\"fa fa-lg fa-gavel\"></i>\r\n</button>");
$templateCache.put("common/cc/cctemplate.html","<div>\r\n   <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n         <a target=\"_blank\" ng-href=\"{{details.link}}\">Creative Commons Attribution {{details.version}} </a>\r\n      </div>\r\n   </div>\r\n   <div class=\"row\">\r\n      <div class=\"col-md-2\">\r\n         <span class=\"fa-stack\" aria-hidden=\"true\">\r\n         <i class=\"fa fa-check-circle-o fa-stack-2x\" aria-hidden=\"true\"></i>\r\n      </span>\r\n      </div>\r\n      <div class=\"col-md-10\">\r\n         You may use this work for commercial purposes.\r\n      </div>\r\n   </div>\r\n   <div class=\"row\">\r\n      <div class=\"col-md-2\">\r\n         <span class=\"fa-stack\" aria-hidden=\"true\">\r\n         <i class=\"fa fa-circle-o fa-stack-2x\"></i>\r\n         <i class=\"fa fa-female fa-stack-1x\"></i>\r\n      </span>\r\n      </div>\r\n      <div class=\"col-md-10\">\r\n         You must attribute the creator in your own works.\r\n      </div>\r\n   </div>\r\n</div>");
$templateCache.put("common/header/header.html","<div class=\"container-full common-header\" style=\"padding-right:10px; padding-left:10px\">\r\n    <div class=\"navbar-header\">\r\n\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".ga-header-collapse\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n\r\n        <a href=\"/\" class=\"appTitle visible-xs\">\r\n            <h1 style=\"font-size:120%\">{{heading}}</h1>\r\n        </a>\r\n    </div>\r\n    <div class=\"navbar-collapse collapse ga-header-collapse\">\r\n        <ul class=\"nav navbar-nav\">\r\n            <li class=\"hidden-xs\"><a href=\"/\"><h1 class=\"applicationTitle\">{{heading}}</h1></a></li>\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right nav-icons\">\r\n        	<li common-navigation role=\"menuitem\" current=\"current\" style=\"padding-right:10px\"></li>\r\n			<li mars-version-display role=\"menuitem\"></li>\r\n			<li style=\"width:10px\"></li>\r\n        </ul>\r\n    </div><!--/.nav-collapse -->\r\n</div>\r\n\r\n<!-- Strap -->\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"strap-blue\">\r\n        </div>\r\n        <div class=\"strap-white\">\r\n        </div>\r\n        <div class=\"strap-red\">\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("common/accordion/accordion.html","<div role=\"tablist\" class=\"panel-group\" ng-transclude></div>");
$templateCache.put("common/accordion/accordionGroup.html","<div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\r\n  <h4 class=\"panel-title\">\r\n    <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\"\r\n            aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\"\r\n            common-accordion-transclude=\"heading\" ng-disabled=\"isDisabled\" uib-tabindex-toggle>\r\n      <span common-accordion-header ng-class=\"{\'text-muted\': isDisabled}\">{{heading}}</span>\r\n   </a>\r\n  </h4>\r\n</div>\r\n<div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\"\r\n            class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\r\n  <div class=\"panel-body\" ng-transclude></div>\r\n</div>");
$templateCache.put("common/iso19115/contact.html","<ul ng-show=\"node.hierarchyLevel\">\r\n   <li>\r\n      <span class=\"iso19115-head\">Contact</span>\r\n      <iso19115-node name=\"MD_ScopeCode\" node=\"node.hierarchyLevel.MD_ScopeCode\" type=\"_codeListValue\"></iso19115-node>\r\n    </li>\r\n</ul>");
$templateCache.put("common/iso19115/double.html","\r\n<ul ng-show=\"node\">\r\n   <li>\r\n      <span class=\"iso19115-head\">{{name | iso19115NodeName}}</span>\r\n      <iso19115-node name=\"name\" node=\"node[name]\" type=\"type\"></iso19115-node>\r\n   </li>\r\n</ul>\r\n");
$templateCache.put("common/iso19115/metadata.html","<div class=\"iso19115\">\r\n   <ul>\r\n      <li>\r\n         <span class=\"iso19115-head\">Metadata</span>\r\n         <iso19115-node name=\"fileIdentifier\" node=\"node.fileIdentifier\" type=\"CharacterString\"></iso19115-node>\r\n         <iso19115-node name=\"language\" node=\"node.language\" type=\"LanguageCode\"></iso19115-node>\r\n         <ul ng-show=\"node.characterSet\">\r\n            <li>\r\n               <span class=\"iso19115-head\">Character Set</span>\r\n               <iso19115-node name=\"CharacterSetCode\" node=\"node.characterSet.MD_CharacterSetCode\" type=\"_codeListValue\"></iso19115-node>\r\n            </li>\r\n         </ul>\r\n\r\n         <ul ng-show=\"node.hierarchyLevel\">\r\n            <li>\r\n               <span class=\"iso19115-head\">Hierarchy Level</span>\r\n               <iso19115-node name=\"MD_ScopeCode\" node=\"node.hierarchyLevel.MD_ScopeCode\" type=\"_codeListValue\"></iso19115-node>\r\n            </li>\r\n         </ul>\r\n         <iso19115-node name=\"hierarchyLevelName\" node=\"node.hierarchyLevelName\" type=\"CharacterString\"></iso19115-node>\r\n         <iso19115-contact ng-if=\"node.contact\" node=\"node.contact\" key=\"\'contact\'\"></iso19115-contact>\r\n      </li>\r\n   </ul>\r\n</div>");
$templateCache.put("common/metaview/dublincore.html","Dublin core");
$templateCache.put("common/metaview/iso19115.html","<iso19115-metadata node=\"data.metadata.GetRecordByIdResponse.MD_Metadata\" key=\"\'MD_Metadata\'\"></iso19115-metadata>\r\n");
$templateCache.put("common/metaview/iso19115node.html","<ul>\r\n   <li>\r\n      <span class=\"metaview-head\">{{key | metaviewNodeName}}</span>\r\n      <span>{{node | metaviewText}}</span>\r\n      <ng-repeat ng-if=\"isArray()\" ng-repeat=\"next in node\" node=\"next]\">\r\n         <metaview-iso19115-array ng-repeat=\"nextKey in getKeys() track by $index\" node=\"node[nextKey]\" key=\"nextKey\"></metaview-iso19115-array>\r\n      </ng-repeat>\r\n      <metaview-iso19115-node ng-if=\"!isArray()\" ng-repeat=\"nextKey in getKeys() track by $index\" node=\"node[nextKey]\" key=\"nextKey\"></metaview-iso19115-node>\r\n   </li>\r\n</ul>");
$templateCache.put("common/metaview/item.html","<div>\r\n	<button class=\"btn btn-sm btn-outline-primary\" ng-click=\"container.selected = null\"><i class=\"fa fa-angle-double-left\"></i> Back</button>\r\n      <span style=\"font-weight: bold;padding-left:10px; font-size:130%\">{{container.selected.title}}</span>\r\n      <metaview-iso19115 data=\"container.selected\"></metaview-iso19115>\r\n</div>");
$templateCache.put("common/metaview/metaview.html","<button type=\"button\" class=\"undecorated\" title=\"View metadata\" ng-click=\"select()\">\r\n	<i class=\"fa fa-lg fa-info metaview-info\"></i>\r\n</button>");
$templateCache.put("common/navigation/altthemes.html","<span class=\"altthemes-container\">\r\n	<span ng-repeat=\"item in themes | altthemesMatchCurrent : current\">\r\n       <a title=\"{{item.label}}\" ng-href=\"{{item.url}}\" class=\"altthemesItemCompact\" target=\"_blank\">\r\n         <span class=\"altthemes-icon\" ng-class=\"item.className\"></span>\r\n       </a>\r\n    </li>\r\n</span>");
$templateCache.put("common/panes/panes.html","<div class=\"container contentContainer\">\r\n	<div class=\"row icsmPanesRow\" >\r\n		<div class=\"icsmPanesCol\" ng-class=\"{\'col-md-12\':!view, \'col-md-7\':view}\" style=\"padding-right:0\">\r\n			<div class=\"expToolbar row noPrint\" icsm-toolbar-row map=\"root.map\" overlaytitle=\"\'Change overlay opacity\'\"></div>\r\n			<div class=\"panesMapContainer\" geo-map configuration=\"data.map\">\r\n			    <geo-extent></geo-extent>\r\n			</div>\r\n    		<div geo-draw data=\"data.map.drawOptions\" line-event=\"elevation.plot.data\" rectangle-event=\"bounds.drawn\"></div>\r\n    		<div class=\"common-legend\" common-legend map=\"data.map\"></div>\r\n    		<div icsm-tabs class=\"icsmTabs\"  ng-class=\"{\'icsmTabsClosed\':!view, \'icsmTabsOpen\':view}\"></div>\r\n		</div>\r\n		<div class=\"icsmPanesColRight\" ng-class=\"{\'hidden\':!view, \'col-md-5\':view}\" style=\"padding-left:0; padding-right:0\">\r\n			<div class=\"panesTabContentItem\" ng-show=\"view == \'download\'\" icsm-view></div>\r\n			<div class=\"panesTabContentItem\" ng-show=\"view == \'maps\'\" icsm-maps></div>\r\n			<div class=\"panesTabContentItem\" ng-show=\"view == \'glossary\'\" icsm-glossary></div>\r\n			<div class=\"panesTabContentItem\" ng-show=\"view == \'help\'\" icsm-help></div>\r\n		</div>\r\n	</div>\r\n</div>");
$templateCache.put("common/panes/tabs.html","<!-- tabs go here -->\r\n<div id=\"panesTabsContainer\" class=\"paneRotateTabs\" style=\"opacity:0.9\" ng-style=\"{\'right\' : contentLeft +\'px\'}\">\r\n\r\n	<div class=\"paneTabItem\" ng-class=\"{\'bold\': view == \'download\'}\" ng-click=\"setView(\'download\')\">\r\n		<button class=\"undecorated\">Download</button>\r\n	</div>\r\n	<!-- \r\n	<div class=\"paneTabItem\" ng-class=\"{\'bold\': view == \'search\'}\" ng-click=\"setView(\'search\')\">\r\n		<button class=\"undecorated\">Search</button>\r\n	</div>\r\n	<div class=\"paneTabItem\" ng-class=\"{\'bold\': view == \'maps\'}\" ng-click=\"setView(\'maps\')\">\r\n		<button class=\"undecorated\">Layers</button>\r\n	</div>\r\n	-->\r\n	<div class=\"paneTabItem\" ng-class=\"{\'bold\': view == \'glossary\'}\" ng-click=\"setView(\'glossary\')\">\r\n		<button class=\"undecorated\">Glossary</button>\r\n	</div>\r\n	<div class=\"paneTabItem\" ng-class=\"{\'bold\': view == \'help\'}\" ng-click=\"setView(\'help\')\">\r\n		<button class=\"undecorated\">Help</button>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("common/toolbar/toolbar.html","<div icsm-toolbar>\r\n	<div class=\"row toolBarGroup\">\r\n		<div class=\"btn-group searchBar\" ng-show=\"root.whichSearch != \'region\'\">\r\n			<div class=\"input-group\" geo-search>\r\n				<input type=\"text\" ng-autocomplete ng-model=\"values.from.description\" options=\'{country:\"au\"}\'\r\n							size=\"32\" title=\"Select a locality to pan the map to.\" class=\"form-control\" aria-label=\"...\">\r\n				<div class=\"input-group-btn\">\r\n    				<button ng-click=\"zoom(false)\" exp-ga=\"[\'send\', \'event\', \'icsm\', \'click\', \'zoom to location\']\"\r\n						class=\"btn btn-default\"\r\n						title=\"Pan and potentially zoom to location.\"><i class=\"fa fa-search\"></i></button>\r\n				</div>\r\n			</div>\r\n		</div>\r\n\r\n		<div class=\"pull-right\">\r\n			<div class=\"btn-toolbar radCore\" role=\"toolbar\"  icsm-toolbar>\r\n				<div class=\"btn-group\">\r\n					<!-- < icsm-state-toggle></icsm-state-toggle> -->\r\n				</div>\r\n			</div>\r\n\r\n			<div class=\"btn-toolbar\" style=\"margin:right:10px;display:inline-block\">\r\n				<div class=\"btn-group\" title=\"{{overlaytitle}}\">\r\n					<span class=\"btn btn-default\" common-baselayer-control max-zoom=\"16\"></span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>");}]);