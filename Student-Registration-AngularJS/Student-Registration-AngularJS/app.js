angular.module("studentApp", [])
  .controller("StudentController", function ($scope) {

    $scope.courses = ["B.Tech", "BCA", "MCA", "M.Tech", "B.Sc"];
    $scope.semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.hobbyOptions = ["Reading", "Sports", "Music", "Coding", "Travelling"];

    $scope.students = [];
    $scope.registered = null;
    $scope.submitted = false;
    $scope.duplicate = false;

    function emptyStudent() {
      return {
        name: "",
        enrollment: "",
        email: "",
        mobile: "",
        gender: "",
        course: null,
        semester: null,
        hobbies: [],
        address: ""
      };
    }

    $scope.student = emptyStudent();

    $scope.hasError = function (field, key) {
      return field.$error[key] && (field.$touched || $scope.submitted);
    };

    $scope.toggleHobby = function (hobby) {
      var index = $scope.student.hobbies.indexOf(hobby);
      if (index === -1) {
        $scope.student.hobbies.push(hobby);
      } else {
        $scope.student.hobbies.splice(index, 1);
      }
    };

    $scope.isDuplicate = function (enrollment) {
      return $scope.students.some(function (s) {
        return s.enrollment === enrollment;
      });
    };

    $scope.clearForm = function (form) {
      $scope.student = emptyStudent();
      $scope.submitted = false;
      $scope.duplicate = false;
      form.$setPristine();
      form.$setUntouched();
    };

    $scope.register = function (form) {
      $scope.submitted = true;
      $scope.duplicate = false;

      if (form.$invalid || $scope.student.hobbies.length === 0) {
        return;
      }

      if ($scope.isDuplicate($scope.student.enrollment)) {
        $scope.duplicate = true;
        return;
      }

      var record = angular.copy($scope.student);
      $scope.students.push(record);
      $scope.registered = record;
      $scope.clearForm(form);
    };

    $scope.reset = function (form) {
      $scope.registered = null;
      $scope.clearForm(form);
    };
  });
