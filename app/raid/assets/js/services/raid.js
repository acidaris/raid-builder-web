angular.module('RaidBuilder.raid').service('raid', function ($localStorage) {
  var members = $localStorage.raidMembers;
  var self = this;

  this.notInTeam = function (newCharacter) {
    var notInTeam = true;
    var characters = angular.copy(members.tanks);
    characters = characters.concat(members.heals).concat(members.dps);
    angular.forEach(characters, function (character) {
      if(character.realm == newCharacter.realm && character.name == newCharacter.name)
      {
        notInTeam = false;
      }
    });
    return notInTeam;
  };

  this.members = function () {
    return members;
  };

  this.reset = function () {
    members.tanks = [];
    members.heals = [];
    members.dps = [];
  };

  // TODO: Switch role (#11)

  this.add = function (character) {
    if (self.notInTeam(character)) {
      angular.forEach(character.talents, function (talents) {
        if (talents.spec && talents.selected) {
          switch (talents.spec.role) {
            case 'TANK':
              members.tanks.push(character);
              break;
            case 'HEALING':
              members.heals.push(character);
              break;
            case 'DPS':
              members.dps.push(character);
              break;
          }
        }
      });
    }
  };
});