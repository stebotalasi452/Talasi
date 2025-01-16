import React, { useState, useEffect } from "react";

const InstituteAddCourse = () => {
    const [faculty, setFaculty] = useState("");
    const [newCourseName, setNewCourseName] = useState("");
    const [entryRequirements, setEntryRequirements] = useState("");
    const [courseCapacity, setCourseCapacity] = useState(10);
    const [applicationDeadline, setApplicationDeadline] = useState("");
    const [courses, setCourses] = useState([]);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        // Load courses from localStorage on mount
        const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
        setCourses(storedCourses);
        setCourseList(storedCourses);
    }, []);

    // Add a new course
    const addCourse = () => {
        if (faculty.trim() === "" || newCourseName.trim() === "" || entryRequirements.trim() === "" || applicationDeadline.trim() === "") {
            alert("Please provide faculty, course name, entry requirements, and application deadline.");
            return;
        }

        const deadlineDate = new Date(applicationDeadline);
        if (isNaN(deadlineDate.getTime()) || deadlineDate <= new Date()) {
            alert("Please provide a valid application deadline in the future.");
            return;
        }

        const course = {
            faculty,
            name: newCourseName,
            entryRequirements,
            isFull: false,
            capacity: courseCapacity,
            deadline: deadlineDate,
        };

        // If course is full, mark as full
        if (course.capacity <= 0) {
            alert("Course capacity should be greater than zero.");
            return;
        }

        const updatedCourses = [...courses, course];
        setCourses(updatedCourses);
        setCourseList(updatedCourses);

        // Save to localStorage
        localStorage.setItem("courses", JSON.stringify(updatedCourses));

        setNewCourseName("");
        setEntryRequirements("");
        setFaculty("");
        setCourseCapacity(10);
        setApplicationDeadline("");
        alert(`Course "${newCourseName}" added for Faculty "${faculty}" with an application deadline of ${deadlineDate.toLocaleDateString()}`);
    };

    // Handle capacity change
    const handleCapacityChange = (e) => {
        const value = Math.max(0, e.target.value); // Ensure capacity is a positive number
        setCourseCapacity(value);
    };

    // Handle application deadline change
    const handleDeadlineChange = (e) => {
        setApplicationDeadline(e.target.value);
    };

    // Mark a course as full (if the capacity reaches zero)
    const markCourseFull = (course) => {
        const updatedCourses = courses.map((c) =>
            c === course ? { ...c, isFull: true } : c
        );
        setCourses(updatedCourses);
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
        alert(`Course "${course.name}" is now full.`);
    };

    // Delete a course
    const deleteCourse = (course) => {
        const updatedCourses = courses.filter((c) => c !== course);
        setCourses(updatedCourses);
        setCourseList(updatedCourses);
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
        alert(`Course "${course.name}" has been deleted.`);
    };

    // Filter courses by name or faculty
    const handleFilterChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCourses = courses.filter(
            (course) =>
                course.name.toLowerCase().includes(searchTerm) ||
                course.faculty.toLowerCase().includes(searchTerm)
        );
        setCourseList(filteredCourses);
    };

    return (
        <div>
            <h3>Add Course</h3>
            <input
                type="text"
                placeholder="Faculty Name"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <input
                type="text"
                placeholder="Course Name"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <textarea
                placeholder="Enter course entry requirements"
                value={entryRequirements}
                onChange={(e) => setEntryRequirements(e.target.value)}
                style={{ marginRight: "10px", width: "300px", height: "100px" }}
            />
            <input
                type="number"
                placeholder="Course Capacity"
                value={courseCapacity}
                onChange={handleCapacityChange}
                style={{ marginRight: "10px" }}
            />
            <input
                type="date"
                placeholder="Application Deadline"
                value={applicationDeadline}
                onChange={handleDeadlineChange}
                style={{ marginRight: "10px" }}
            />
            <button onClick={addCourse}>Add Course</button>

            {/* Filter Courses */}
            <div>
                <h4>Filter Courses</h4>
                <input
                    type="text"
                    placeholder="Search by course name or faculty"
                    onChange={handleFilterChange}
                    style={{ marginBottom: "10px" }}
                />
            </div>

            {/* List of Courses */}
            <h3>Course List</h3>
            <ul>
                {courseList.length > 0 ? (
                    courseList.map((course, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <strong>{course.name}</strong> ({course.faculty}) - Capacity: {course.capacity} - Status:{" "}
                            {course.isFull ? (
                                <span style={{ color: "red" }}>Full</span>
                            ) : (
                                <button onClick={() => markCourseFull(course)} style={{ color: "blue" }}>
                                    Mark as Full
                                </button>
                            )}
                            <div>Entry Requirements: {course.entryRequirements}</div>
                            <div>Application Deadline: {new Date(course.deadline).toLocaleDateString()}</div>
                            <button
                                onClick={() => deleteCourse(course)}
                                style={{ color: "red", marginTop: "5px" }}
                            >
                                Delete Course
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </ul>
        </div>
    );
};

export default InstituteAddCourse;
