//Klassen für die einzelnen Items weil nur data Objekt manipulieren nicht so sehr funktioniert. Glaub aber das is nicht notwendig
// ich weiß eh nicht ganz wie ich es einsetzen würde

class installationItem {
    constructor(data) {
        this.name =  data.name;
        this.id = data.id;
        this.created = data.created;
      }
}

class Project extends installationItem {
    constructor(data) {
        super(data);
        this.parentId = 0;
    }
}

class Floor extends installationItem {
    constructor(data) {
        super(data);
        this.parentId = data.projects_id;
        this.countFromBasement = data.floor_count_from_basement;
    }
}

 
