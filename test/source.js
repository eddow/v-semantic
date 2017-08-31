(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("source", {}, function(___scope___){
___scope___.file("accordion.vue", function(exports, require, module, __filename, __dirname){

module.exports = "<template>\r\n\t<s-accordion>\r\n\t\t<s-panel title=\"What is a dog?\">\r\n\t\t\t<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>\r\n\t\t</s-panel>\r\n\t\t<s-panel title=\"What kinds of dogs are there?\">\r\n\t\t\t<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>\r\n\t\t</s-panel>\r\n\t</s-accordion>\r\n</template>\r\n<script lang=\"ts\">\r\nimport * as Vue from 'vue'\r\nimport {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'\r\n\r\n@Component\r\nexport default class Accordion extends Vue {\r\n}\r\n</script>"
});
___scope___.file("table.vue", function(exports, require, module, __filename, __dirname){

module.exports = "<template>\r\n\t<div>\r\n\t\t<s-table\r\n\t\t\tcelled\r\n\t\t\tselectable\r\n\t\t\tv-model=\"my_row\"\r\n\t\t\t:rows=\"my_rows\"\r\n\t\t\tvery-basic\r\n\t\t\t:body-height=\"150\"\r\n\t\t>\r\n\t\t\t<div slot=\"header\">\r\n\t\t\t\tIn-table header\r\n\t\t\t</div>\r\n\t\t\t<s-checkbox-column :selection=\"my_selection\" width=\"29\" />\r\n\t\t\t<s-column property=\"a\" width=\"300\" header=\"a\" />\r\n\t\t\t<s-column header=\"A\">\r\n\t\t\t\t<template scope=\"scope\">\r\n\t\t\t\t\ta{{scope.row.a}}\r\n\t\t\t\t</template>\r\n\t\t\t</s-column>\r\n\t\t\t<s-column property=\"b\">\r\n\t\t\t\t<template slot=\"header\">\r\n\t\t\t\t\tB sum={{sum_b}}\r\n\t\t\t\t</template>\r\n\t\t\t</s-column>\r\n\t\t</s-table>\r\n\t\t<div>\r\n\t\t\t<p><h3>current-row</h3> {{my_row}}</p>\r\n\t\t\t<p><h3>selection</h3> {{my_selection}}</p>\r\n\t\t</div>\r\n\t</div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport * as Vue from 'vue'\r\nimport {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'\r\n\r\nvar rows = (new Array(10)).fill().map((x,i)=> ({a: i*2, b:i*2+1}));\r\n@Component\r\nexport default class Accordion extends Vue {\r\n\tmy_row = null\r\n\tmy_rows = rows\r\n\tmy_selection = []\r\n\tget sum_b() {\r\n\t\treturn this.my_rows.reduce((acc, row)=> acc + row.b, 0);\r\n\t}\r\n}\r\n</script>"
});
});
FuseBox.target = "universal"

FuseBox.import("source/*.vue");
FuseBox.main("source/*.vue");
FuseBox.defaultPackageName = "source";
})
(FuseBox)