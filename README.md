## Voice-Scorer

# Overview

Welcome to Voice Scorer, the most imaginetive program of HackED 2024! Designed to take artifical intelligence and deep
learning to the next level. This README provides the overview of how the program was built up through various steps.

# How we developed it

General framework of the program breaks down to two big components:

1. Deep learning model:
- We have used random forest model to implement the final machine learning model, which took input of over 300 different voice files for training. We have used various libraries to help us implement the model, which includes numpy, scikit, pandas, scipy etc.Before finalizing on the final model, we have tried four different learning tools(RF, MLP, KNN, SVM), and of the four, we ended with the model that used RF with the training accuracy of 98.6%.

2. Web Development:
- We have used Flask as our primary framework for our frontend, using JS, html, and CSS for the User Interface. For the backend, we have used Python to connect the trained model as well as with the frontend.

![Alt text](https://cdn.discordapp.com/attachments/1189980276311478419/1193562241467957348/voice_scorer_web.gif?ex%253D65ad2a75%2526is%253D659ab575%2526hm%253D0474069a413c4424ef95f4a635c618c2c1958b1083e3dcee7a4c46fbc4fb69f9%2526)


Members : Chris, Minjae, Jin, Peter\
date : Jan 06, 2024\
institute : [HACKED](https://hacked.compeclub.com/)

