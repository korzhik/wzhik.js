describe('Zippr has cool filters', function() {

	var tpl, exp;

	describe('escaping', function() {
		it("should escape", function(){
			tpl = Zippr("{{- data.str }}")({str : "&"});
			assert.equal(tpl, "&amp;");
		});
	});

	describe('filters', function() {
		
		it('plural', function() {
			var data = {n1: 1, n2: 2, n3: 3, n4: 5, n5: 11, n6: 22, n7: 33, n8: 0, cows : "korova,korovy,korov" }

			tpl = Zippr("{{= 1 |plural(data.cows) }}")( data );
			assert.equal(tpl, "1 korova");

			tpl = Zippr("{{= 2 |plural(data.cows) }}")( data );
			assert.equal(tpl, "2 korovy");

			tpl = Zippr("{{= data.n3 |plural(data.cows) }}")( data );
			assert.equal(tpl, "3 korovy");

			tpl = Zippr("{{= data.n4|plural(data.cows) }}")( data );
			assert.equal(tpl, "5 korov");

			tpl = Zippr("{{= data.n5 |plural(data.cows) }}")( data );
			assert.equal(tpl, "11 korov");

			tpl = Zippr("{{= data.n6 |plural(data.cows) }}")( data );
			assert.equal(tpl, "22 korovy");

			tpl = Zippr("{{= data.n7 |plural(data.cows) }}")( data );
			assert.equal(tpl, "33 korovy");

			tpl = Zippr("{{= data.n8 |plural(data.cows) }}")( data );
			assert.equal(tpl, "0 korov");
		});


		it("numberFormat", function(){
			var t, map = {
				"1234.56 - 1,235" : null,
				"1234.56 - 1 234,56" : [2, "','", "' '"],
				"67 - 67,00" : [2, "','"],
				"1000 - 1,000" : null,
				"1000.55 - 1,000.6" : [1],
				"67000 - 67.000,00000" : [5, "','", "'.'"],
				"0.9 - 1" : [0],
				"1.20 - 1.2000": [4]
			}

			for(var k in map ) {
				t = k.split(" - ");
				tpl = Zippr("{{= data.n |numberFormat"+(map[k] ? ("(" + map[k] + ")") : "")+" }}")({n: (t[0])});
				assert.equal(tpl, t[1]);
			}
		});

		it('date', function() {
			tpl = Zippr("{{= data.timestamp |date('d.m.Y') }}")({timestamp: +new Date("12 nov 2014") / 1000});
			assert.equal(tpl, "12.11.2014");
		});

	});

});