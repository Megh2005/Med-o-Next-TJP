import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { HealthRecommendationModel } from "@/models/HealthRecommendation";
import { UserModel } from "@/models/User";
import { ApiResponse } from "@/utils/ApiResponse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const user = (await getServerSession(authOptions))?.user;

    if (!user) {
      throw new Error("Unauthorized user");
    }

    const formData = await req.formData();
    const userInfo = {
      age: parseInt(formData.get("age") as string),
      gender: formData.get("gender"),
      height: parseInt(formData.get("height") as string),
      weight: parseInt(formData.get("weight") as string),
      disease: formData.get("disease"),
    };

    if (
      userInfo.age === 0 ||
      userInfo.gender === "" ||
      userInfo.height === 0 ||
      userInfo.weight === 0 ||
      userInfo.disease === ""
    ) {
      throw new Error("Please fill all the fields");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const prompt = `
        You are a lifestyle and health coach. Based on the information provided, give specific recommendations for managing health and wellness for a ${userInfo.age}-year-old ${userInfo.gender} who has been diagnosed with ${userInfo.disease}. 
        Focus on providing actionable advice on diet, physical activities, weight management, sleep, stress management, regular checkups, healthy habits, and lifestyle changes. 
        Additionally, suggest preventive measures and lifestyle modifications that can help cope with the effects of ${userInfo.disease}.
        
        Structure the response in an object format. An example output is given: 
        {
  title: "Managing High Blood Pressure: A Personalized Plan for a 20-Year-Old Male",
  introduction: "It's great you're taking proactive steps to manage your high blood pressure at such a young age. Here's a comprehensive plan tailored for you.",
  sections: [
    {
      title: "Diet",
      items: [
        { subtitle: "DASH Diet", description: "Focus on the DASH diet, which emphasizes fruits, vegetables, whole grains, lean protein, and low-fat dairy. This diet is proven to lower blood pressure effectively." },
        { subtitle: "Limit Sodium", description: "Aim for less than 2,300mg of sodium per day, ideally under 1,500mg. Read food labels carefully and choose fresh, unprocessed foods." },
        { subtitle: "Hydrate", description: "Drink plenty of water throughout the day. Aim for 8 glasses of water daily." },
        { subtitle: "Limit Processed Foods", description: "Cut back on processed foods, fast food, and sugary drinks, all high in sodium and unhealthy fats." },
        { subtitle: "Potassium-Rich Foods", description: "Include potassium-rich foods like bananas, sweet potatoes, spinach, and avocados in your diet." }
      ]
    },
    {
      title: "Physical Activity",
      items: [
        { subtitle: "Regular Exercise", description: "Aim for at least 30 minutes of moderate-intensity exercise most days of the week, such as brisk walking, jogging, swimming, cycling, or dancing." },
        { subtitle: "Strength Training", description: "Incorporate strength training exercises 2-3 times a week to build muscle mass, which can further help manage blood pressure." },
        { subtitle: "Find Your Groove", description: "Choose activities you enjoy to make exercise more sustainable and fun." }
      ]
    },
    {
      title: "Weight Management",
      items: [
        { subtitle: "Healthy Weight Loss", description: "If you're overweight or obese, even a small amount of weight loss can significantly reduce blood pressure. Aim for gradual, sustainable weight loss of 1-2 pounds per week." },
        { subtitle: "Calorie Control", description: "Consult with a doctor or registered dietitian to determine a healthy calorie intake for you." },
        { subtitle: "Portion Control", description: "Be mindful of portion sizes and avoid overeating." }
      ]
    },
    {
      title: "Sleep",
      items: [
        { subtitle: "Quality Sleep", description: "Aim for 7-9 hours of quality sleep per night." },
        { subtitle: "Establish a Sleep Routine", description: "Go to bed and wake up at the same time each day, even on weekends, to regulate your body's natural sleep-wake cycle." },
        { subtitle: "Optimize Sleep Environment", description: "Ensure a dark, quiet, and cool bedroom for better sleep." }
      ]
    },
    {
      title: "Stress Management",
      items: [
        { subtitle: "Identify Stressors", description: "Become aware of your triggers and the situations that cause you stress." },
        { subtitle: "Relaxation Techniques", description: "Practice stress-reducing techniques like yoga, meditation, deep breathing exercises, or progressive muscle relaxation." },
        { subtitle: "Time Management", description: "Prioritize tasks, break down large projects, and learn to say 'no' to reduce overwhelm." },
        { subtitle: "Social Support", description: "Connect with loved ones, join support groups, or seek professional help to manage stress." }
      ]
    },
    {
      title: "Regular Checkups",
      items: [
        { subtitle: "Doctor Visits", description: "Schedule regular checkups with your doctor to monitor your blood pressure and make adjustments to your treatment plan as needed." },
        { subtitle: "Blood Pressure Monitoring", description: "Regularly check your blood pressure at home using a home monitor. This helps you track your progress and identify any sudden changes." }
      ]
    },
    {
      title: "Healthy Habits",
      items: [
        { subtitle: "Limit Alcohol and Caffeine", description: "Reduce your intake of alcohol and caffeine, which can temporarily increase blood pressure." },
        { subtitle: "Quit Smoking", description: "If you smoke, quitting is essential. Smoking significantly increases the risk of cardiovascular disease and high blood pressure." },
        { subtitle: "Healthy Lifestyle", description: "Focus on overall healthy habits like eating a balanced diet, exercising regularly, managing stress, and getting enough sleep." }
      ]
    },
    {
      title: "Preventive Measures",
      items: [
        { subtitle: "Regular Exercise", description: "Maintaining a physically active lifestyle is crucial for preventing high blood pressure and promoting overall health." },
        { subtitle: "Healthy Diet", description: "Adopting a balanced diet rich in fruits, vegetables, and whole grains helps lower your risk of developing high blood pressure." },
        { subtitle: "Weight Management", description: "Maintaining a healthy weight is essential for reducing your risk of developing high blood pressure." },
        { subtitle: "Stress Management", description: "Learning to manage stress through relaxation techniques and healthy coping mechanisms can significantly reduce your risk of high blood pressure." },
        { subtitle: "Regular Checkups", description: "Regular medical checkups allow your doctor to monitor your blood pressure and identify any early warning signs of high blood pressure." }
      ]
    },
    {
      title: "Lifestyle Changes",
      items: [
        { subtitle: "Stress Reduction", description: "Implement stress management techniques into your daily routine, such as meditation, yoga, or spending time in nature." },
        { subtitle: "Healthy Eating Habits", description: "Prioritize nutritious foods, limit processed foods, and practice mindful eating." },
        { subtitle: "Physical Activity", description: "Incorporate regular exercise into your daily routine. Find activities you enjoy to make it sustainable." },
        { subtitle: "Sleep Hygiene", description: "Develop good sleep habits, ensuring sufficient sleep and creating a relaxing sleep environment." },
        { subtitle: "Social Connections", description: "Maintain strong social connections and engage in activities you enjoy." }
      ]
    }
  ],
  note: "This information is for general guidance only and is not a substitute for professional medical advice. Consult your doctor or a qualified healthcare professional for personalized recommendations and treatment options for managing your high blood pressure."
};
        `;
    const result = await model.generateContent([prompt]);
    const content = JSON.parse(
      result.response.text().replace(/```json\s*|\s*```/g, "")
    );

    const currentUser = await UserModel.findOne({ email: user.email });

    if (!currentUser) {
      throw new Error("User not found");
    }

    await HealthRecommendationModel.create({
      content: JSON.stringify(content),
      recommendationFor: currentUser._id,
    });

    return NextResponse.json(new ApiResponse(200, "Success", content), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(new ApiResponse(400, error.message, null), {
        status: 400,
      });
    } else {
      return NextResponse.json(
        new ApiResponse(400, "An unknown error occurred", null),
        { status: 400 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const user = (await getServerSession(authOptions))?.user;

    if (!user) {
      throw new Error("Unauthorized user");
    }

    const currentUser = await UserModel.findOne({ email: user.email });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get("page") as string);
    const pageSize = parseInt(url.searchParams.get("pageSize") as string) || 10;

    const prescriptions = await HealthRecommendationModel.aggregate([
      {
        $match: {
          recommendationFor: new mongoose.Types.ObjectId(currentUser._id),
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: {
            $ifNull: [{ $arrayElemAt: ["$metadata.totalCount", 0] }, 0],
          },
        },
      },
    ]);

    const response = {
      data: prescriptions[0].data,
      metadata: {
        totalCount: prescriptions[0].totalCount,
        page,
        pageSize,
        hasNextPage: prescriptions[0].totalCount - page * pageSize > 0,
      },
    };

    return NextResponse.json(new ApiResponse(200, "Success", response), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(new ApiResponse(400, error.message, null), {
        status: 400,
      });
    } else {
      return NextResponse.json(
        new ApiResponse(400, "An unknown error occurred", null),
        { status: 400 }
      );
    }
  }
}
