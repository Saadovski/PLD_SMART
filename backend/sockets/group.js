exports.Group =  class Group {

    constructor(options) {

        /** @type { Server } */
        this.id = options.id; // Shortname for -> io.of('/your_namespace_here')
        
        /** @type { Socket } */
       
        this.mood = options.mood;
        this.composition = options.composition;
        this.proprietaire = option.proprietaire;
        
        
    }

}