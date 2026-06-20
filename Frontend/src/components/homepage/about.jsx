import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h2 {
    margin-bottom: 2rem;
    color: #4e0eff;
    font-size: 2.5rem;
  }

  .content {
    max-width: 900px;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .features {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1000px;
  }

  .card {
    padding: 1.5rem;
    border-radius: 12px;
    background: rgba(78, 14, 255, 0.08);
  }

  .card h3 {
    margin-bottom: 1rem;
    color: #4e0eff;
  }
`;

const About = () => {
  return (
    <Container>
      <h2>About HostelCare</h2>

      <div className="content">
        HostelCare is a smart hostel complaint management platform that
        enables students to report issues, track complaint status, and
        communicate with hostel administration in real time.
      </div>

      <div className="features">
        <div className="card">
          <h3>Complaint Management</h3>
          <p>Submit and track maintenance issues efficiently.</p>
        </div>

        <div className="card">
          <h3>Real-Time Communication</h3>
          <p>Chat directly with hostel administration.</p>
        </div>

        <div className="card">
          <h3>Status Tracking</h3>
          <p>Monitor complaints from submission to resolution.</p>
        </div>

        <div className="card">
          <h3>Student Friendly</h3>
          <p>Simple and intuitive interface for hostel residents.</p>
        </div>
      </div>
    </Container>
  );
};

export default About;