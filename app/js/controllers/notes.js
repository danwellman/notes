(function () {
    'use strict';

    angular.module('notes').controller('notesController', NotesController);

    NotesController.$inject = ['$scope', '$document', '$timeout', 'localStorageService', 'uuid'];

    function NotesController($scope, $document, $timeout, localStorageService, uuid) {

        $scope.localStorageSupported = localStorageService.supportsStorage();

        if ($scope.localStorageSupported) {
            $scope.notes = localStorageService.getNotes() || [];
            $scope.currentNote = $scope.notes[0] || {};

            $scope.edited = false;
            $scope.showModal = false;

            $scope.preSaveNote = function () {
                if (!$scope.currentNote.title) {
                    $scope.showModal = true;
                    $timeout(function () {
                        var field = $document[0].getElementById('title');
                        field.focus();
                    }, 0);
                } else {
                    $scope.saveNote();
                }
            };

            $scope.hideModal = function ($event) {
                $scope.showModal = !$event.target.classList.contains('overlay');
            };

            $scope.saveNote = function () {
                $scope.showModal = false;
                $scope.edited = false;

                if (!$scope.currentNote.id) {
                    $scope.currentNote.id = uuid.generate();
                    $scope.notes.push($scope.currentNote);
                } else {
                    $scope.notes.some(function (note, index) {
                        if (note.id === $scope.currentNote.id) {
                            $scope.notes.splice(index, 1, $scope.currentNote);
                        }
                    });
                }

                localStorageService.saveNotes($scope.notes);

                $timeout(function () {
                    var newActive = $document[0].getElementById($scope.currentNote.id);
                    newActive.classList.add('active');
                });
            };

            $scope.newNote = function () {
                var currentActive = $document[0].getElementsByClassName('active')[0],
                    editor = $document[0].getElementsByTagName('textarea')[0];

                $scope.currentNote = {};

                if (currentActive) {
                    currentActive.classList.remove('active');
                }

                editor.focus();
            };

            $scope.openNote = function ($event) {
                var hash = $event.target.id,
                    currentActive = $document[0].getElementsByClassName('active')[0];

                $scope.notes.some(function (note) {
                    if (note.id === hash) {
                        $scope.currentNote = note;

                        return true;
                    }
                });

                currentActive.classList.remove('active');
                $event.target.classList.add('active');
            };

            $scope.deleteNote = function ($event) {
                var hash = $scope.currentNote.id;

                $scope.notes.some(function (note, index) {
                    var newNote, newActive;

                    if (note.id === hash) {

                        newNote = $scope.notes[index - 1] || $scope.notes[index + 1] || {},
                        newActive = $document[0].getElementById(newNote.id);

                        if (newActive) {
                            newActive.classList.add('active');
                        }

                        $scope.notes.splice(index, 1);
                        $scope.currentNote = newNote;

                        return true;
                    }
                });

                localStorageService.saveNotes($scope.notes);
            };

        }

    }
}());
