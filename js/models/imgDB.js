var db = new Dexie("portfolio-database");
db.version(1).stores({
	projects: 'name,year'
});

db.open();

db.projects.put({name: "foo", year: 2015}).then(function(){
	return db.projects.get('foo');
}).then(function(project) {
	alert("This project is from "+ project.year);
}).catch(function(error){alert("Bajs: " + error);});